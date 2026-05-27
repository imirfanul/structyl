import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Root, Step, Title, Description, Separator } from './index';

const meta: Meta = {
  title: 'Styled/Stepper',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

const ONBOARDING_STEPS = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Preferences', description: 'Choose your settings' },
  { title: 'Done', description: 'All set!' },
];

export const Default: Story = {
  render: () => (
    <div className="w-[560px]">
      <Root activeStep={1}>
        {ONBOARDING_STEPS.map((s, i) => (
          <React.Fragment key={s.title}>
            <Step index={i}>
              <div className="flex flex-col items-center gap-1 min-w-[60px]">
                <div />
                <Title>{s.title}</Title>
              </div>
            </Step>
            {i < ONBOARDING_STEPS.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </Root>
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive stepper',
  render: function InteractiveStory() {
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = ONBOARDING_STEPS;

    return (
      <div className="w-[560px] space-y-8">
        <Root activeStep={activeStep}>
          {steps.map((s, i) => (
            <React.Fragment key={s.title}>
              <Step index={i}>
                <div className="flex flex-col items-center gap-1 min-w-[60px]">
                  <div />
                  <Title>{s.title}</Title>
                </div>
              </Step>
              {i < steps.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </Root>

        <div className="rounded-lg border border-border p-6 space-y-3">
          <p className="text-sm font-medium">{steps[activeStep]?.title}</p>
          <p className="text-sm text-muted-foreground">{steps[activeStep]?.description}</p>
        </div>

        <div className="flex justify-between">
          <button
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            disabled={activeStep === 0}
            onClick={() => setActiveStep((s) => s - 1)}
          >
            Back
          </button>
          <button
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={activeStep === steps.length - 1}
            onClick={() => setActiveStep((s) => s + 1)}
          >
            {activeStep === steps.length - 2 ? 'Finish' : 'Continue'}
          </button>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  name: 'Vertical orientation',
  render: () => (
    <div className="w-[280px]">
      <Root activeStep={2} orientation="vertical">
        {[
          { title: 'Select template', description: 'Choose a starting point' },
          { title: 'Configure', description: 'Adjust settings' },
          { title: 'Review', description: 'Check everything looks good' },
          { title: 'Deploy', description: 'Ship to production' },
        ].map((s, i, arr) => (
          <React.Fragment key={s.title}>
            <Step index={i}>
              <div className="flex flex-col gap-0.5">
                <Title>{s.title}</Title>
                <Description>{s.description}</Description>
              </div>
            </Step>
            {i < arr.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </Root>
    </div>
  ),
};

export const AllComplete: Story = {
  name: 'All steps complete',
  render: () => (
    <div className="w-[560px]">
      <Root activeStep={4}>
        {ONBOARDING_STEPS.map((s, i) => (
          <React.Fragment key={s.title}>
            <Step index={i}>
              <div className="flex flex-col items-center gap-1 min-w-[60px]">
                <div />
                <Title>{s.title}</Title>
              </div>
            </Step>
            {i < ONBOARDING_STEPS.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </Root>
    </div>
  ),
};
