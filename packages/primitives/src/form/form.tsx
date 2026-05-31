'use client';

import * as React from 'react';
import { createContext, Primitive } from '@structyl/core';
import { useId, useComposedRefs } from '@structyl/hooks';
import { composeEventHandlers } from '@structyl/utils';
import type {
  FormProps,
  FormFieldProps,
  FormLabelProps,
  FormControlProps,
  FormMessageProps,
  FormValidityStateProps,
  FormSubmitProps,
  Matcher,
  ValidityMatcher,
} from './form.types';

const DEFAULT_INVALID_MESSAGE = 'This value is not valid';
const DEFAULT_BUILT_IN_MESSAGES: Record<ValidityMatcher, string | undefined> = {
  badInput: DEFAULT_INVALID_MESSAGE,
  patternMismatch: 'This value does not match the required pattern',
  rangeOverflow: 'This value is too large',
  rangeUnderflow: 'This value is too small',
  stepMismatch: 'This value is not a valid step',
  tooLong: 'This value is too long',
  tooShort: 'This value is too short',
  typeMismatch: 'This value does not match the required type',
  valid: undefined,
  valueMissing: 'This value is required',
};

/* ─── Form context ───────────────────────────────────────────────────── */

interface FormContextValue {
  getFieldValidity: (name: string) => ValidityState | undefined;
  onFieldValidityChange: (name: string, validity: ValidityState) => void;
  getFieldCustomMatcherEntries: (name: string) => CustomMatcherEntry[];
  onFieldCustomMatcherEntryAdd: (name: string, entry: CustomMatcherEntry) => void;
  onFieldCustomMatcherEntryRemove: (name: string, id: string) => void;
  getFieldCustomErrors: (name: string) => Record<string, boolean>;
  onFieldCustomErrorsChange: (name: string, errors: Record<string, boolean>) => void;
}

const [FormProvider, useFormContext] = createContext<FormContextValue>('Form');

interface CustomMatcherEntry {
  id: string;
  match: Matcher | ((value: string, formData: FormData) => boolean | Promise<boolean>);
}

/* ─── Form Root ──────────────────────────────────────────────────────── */

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (props, forwardedRef) => {
    const { onClearServerErrors = () => {}, ...rootProps } = props;
    const formRef = React.useRef<HTMLFormElement>(null);
    const composedRefs = useComposedRefs(forwardedRef, formRef);
    const [validityByField, setValidityByField] = React.useState<
      Record<string, ValidityState | undefined>
    >({});
    const [customMatcherEntriesByField] = React.useState(
      new Map<string, CustomMatcherEntry[]>(),
    );
    const [customErrorsByField, setCustomErrorsByField] = React.useState<
      Record<string, Record<string, boolean>>
    >({});

    const ctx: FormContextValue = {
      getFieldValidity: (name) => validityByField[name],
      onFieldValidityChange: (name, validity) =>
        setValidityByField((prev) => ({ ...prev, [name]: validity })),
      getFieldCustomMatcherEntries: (name) =>
        customMatcherEntriesByField.get(name) ?? [],
      onFieldCustomMatcherEntryAdd: (name, entry) => {
        const list = customMatcherEntriesByField.get(name) ?? [];
        customMatcherEntriesByField.set(name, [...list, entry]);
      },
      onFieldCustomMatcherEntryRemove: (name, id) => {
        const list = customMatcherEntriesByField.get(name) ?? [];
        customMatcherEntriesByField.set(
          name,
          list.filter((entry) => entry.id !== id),
        );
      },
      getFieldCustomErrors: (name) => customErrorsByField[name] ?? {},
      onFieldCustomErrorsChange: (name, errors) =>
        setCustomErrorsByField((prev) => ({ ...prev, [name]: errors })),
    };

    return (
      <FormProvider {...ctx}>
        <Primitive.form
          {...rootProps}
          ref={composedRefs}
          onInvalid={composeEventHandlers(rootProps.onInvalid, (event) => {
            event.preventDefault();
          })}
          onChange={composeEventHandlers(rootProps.onChange, () => {
            onClearServerErrors();
          })}
        />
      </FormProvider>
    );
  },
);
Form.displayName = 'Form';

/* ─── Field ──────────────────────────────────────────────────────────── */

interface FormFieldContextValue {
  id: string;
  name: string;
  serverInvalid: boolean;
}

const [FormFieldProvider, useFormFieldContext] =
  createContext<FormFieldContextValue>('FormField');

const Field = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (props, forwardedRef) => {
    const { name, serverInvalid = false, ...fieldProps } = props;
    const id = useId('form-field');
    return (
      <FormFieldProvider id={id} name={name} serverInvalid={serverInvalid}>
        <Primitive.div {...fieldProps} ref={forwardedRef} />
      </FormFieldProvider>
    );
  },
);
Field.displayName = 'Form.Field';

/* ─── Label ──────────────────────────────────────────────────────────── */

const Label = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, forwardedRef) => {
    const fieldCtx = useFormFieldContext('Form.Label');
    return <Primitive.label htmlFor={fieldCtx.id} {...props} ref={forwardedRef} />;
  },
);
Label.displayName = 'Form.Label';

/* ─── Control ─────────────────────────────────────────────────────────── */

const Control = React.forwardRef<HTMLInputElement, FormControlProps>(
  (props, forwardedRef) => {
    const fieldCtx = useFormFieldContext('Form.Control');
    const formCtx = useFormContext('Form.Control');
    const ref = React.useRef<HTMLInputElement>(null);
    const composedRef = useComposedRefs(forwardedRef, ref);
    const name = fieldCtx.name;

    React.useEffect(() => {
      const node = ref.current;
      if (!node) return;
      const handleInvalid = () => {
        formCtx.onFieldValidityChange(name, node.validity);
      };
      const handleChange = () => {
        formCtx.onFieldValidityChange(name, node.validity);
      };
      node.addEventListener('invalid', handleInvalid);
      node.addEventListener('change', handleChange);
      return () => {
        node.removeEventListener('invalid', handleInvalid);
        node.removeEventListener('change', handleChange);
      };
    }, [formCtx, name]);

    const validity = formCtx.getFieldValidity(name);
    const invalid = fieldCtx.serverInvalid || (validity ? !validity.valid : false);

    return (
      <Primitive.input
        id={fieldCtx.id}
        name={name}
        aria-invalid={invalid || undefined}
        aria-describedby={`${fieldCtx.id}-message`}
        {...props}
        ref={composedRef}
      />
    );
  },
);
Control.displayName = 'Form.Control';

/* ─── Message ─────────────────────────────────────────────────────────── */

const Message = React.forwardRef<HTMLSpanElement, FormMessageProps>(
  (props, forwardedRef) => {
    const { match, forceMatch, children, ...rest } = props;
    const fieldCtx = useFormFieldContext('Form.Message');
    const formCtx = useFormContext('Form.Message');
    const validity = formCtx.getFieldValidity(fieldCtx.name);
    const matches = match
      ? typeof match === 'string'
        ? hasMatch(validity, match)
        : false
      : !validity?.valid;
    if (!matches && !forceMatch && !fieldCtx.serverInvalid) return null;
    const defaultLabel =
      typeof match === 'string'
        ? DEFAULT_BUILT_IN_MESSAGES[match as ValidityMatcher] ?? DEFAULT_INVALID_MESSAGE
        : DEFAULT_INVALID_MESSAGE;
    return (
      <Primitive.span
        id={`${fieldCtx.id}-message`}
        {...rest}
        ref={forwardedRef}
      >
        {children ?? defaultLabel}
      </Primitive.span>
    );
  },
);
Message.displayName = 'Form.Message';

function hasMatch(validity: ValidityState | undefined, match: Matcher): boolean {
  if (!validity) return false;
  if (match in validity) return (validity as unknown as Record<string, boolean>)[match] === true;
  return false;
}

/* ─── ValidityState ──────────────────────────────────────────────────── */

const ValidityState: React.FC<FormValidityStateProps> = ({ children }) => {
  const fieldCtx = useFormFieldContext('Form.ValidityState');
  const formCtx = useFormContext('Form.ValidityState');
  return <>{children(formCtx.getFieldValidity(fieldCtx.name))}</>;
};
ValidityState.displayName = 'Form.ValidityState';

/* ─── Submit ─────────────────────────────────────────────────────────── */

const Submit = React.forwardRef<HTMLButtonElement, FormSubmitProps>(
  (props, forwardedRef) => (
    <Primitive.button type="submit" {...props} ref={forwardedRef} />
  ),
);
Submit.displayName = 'Form.Submit';

export { Form as Root, Field, Label, Control, Message, ValidityState, Submit };
