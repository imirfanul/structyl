import * as React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Root as Stepper, Step, Title, Description, Separator } from './index';

describe('Stepper (styled)', () => {
  it('renders steps and marks the active step', async () => {
    const { container, getByText } = render(
      <Stepper activeStep={1}>
        <Step index={0}>
          <Title>First</Title>
          <Description>First step</Description>
        </Step>
        <Separator />
        <Step index={1}>
          <Title>Second</Title>
          <Description>Second step</Description>
        </Step>
      </Stepper>,
    );

    expect(getByText('Second')).toBeTruthy();
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
