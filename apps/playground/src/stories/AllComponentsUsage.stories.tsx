import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Paper, Typography } from '@aura-ui/styled';
import {
  componentUsageExamples,
  componentUsageGroups,
  type UsageExample,
} from '../../../docs/lib/component-usage-examples';
import { MuiMaterialPropsGalleryStory } from './MuiParityExamples';

const meta: Meta = {
  title: 'All Components/Usage Gallery',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;
type UsageGroupData = (typeof componentUsageGroups)[number];
const defaultUsageGroups: UsageGroupData[] = componentUsageGroups.map((group) => ({
  title: group.title,
  slugs: group.slugs.slice(0, 2),
}));

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function ExampleCard({
  componentName,
  example,
}: {
  componentName: string;
  example: UsageExample;
}) {
  return (
    <Paper className="grid min-h-80 gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Typography variant="small" className="font-semibold">
            {example.title}
          </Typography>
          {example.description ? (
            <Typography variant="muted" className="mt-1 text-xs">
              {example.description}
            </Typography>
          ) : null}
        </div>
        <Badge variant="secondary">{componentName}</Badge>
      </div>
      <div className="flex min-h-44 items-center justify-center rounded-md border border-border bg-muted/20 p-4">
        {example.preview()}
      </div>
    </Paper>
  );
}

function UsageGroup({ title, slugs }: { title: string; slugs: readonly string[] }) {
  return (
    <section className="grid gap-4">
      <div>
        <Typography variant="h2">{title}</Typography>
        <Typography variant="muted">
          Larger usage previews, prop states and realistic data examples.
        </Typography>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {slugs.flatMap((slug) => {
          const examples = componentUsageExamples[slug] ?? [];
          return examples.map((example) => (
            <ExampleCard
              key={`${slug}-${example.title}`}
              componentName={titleFromSlug(slug)}
              example={example}
            />
          ));
        })}
      </div>
    </section>
  );
}

function UsageGallery({ groups = componentUsageGroups }: { groups?: readonly UsageGroupData[] }) {
  return (
    <div className="grid max-w-7xl gap-10 p-4">
      <div>
        <Typography variant="h1">All component usages</Typography>
        <Typography variant="muted" className="mt-2 max-w-3xl">
          Every core Aura component gets prop-state previews, larger composition examples, and
          realistic data where the component naturally needs it.
        </Typography>
      </div>
      {groups.map((group) => (
        <UsageGroup key={group.title} title={group.title} slugs={group.slugs} />
      ))}
    </div>
  );
}

export const Default: Story = {
  render: () => <UsageGallery groups={defaultUsageGroups} />,
};

export const AllCoreComponents: Story = {
  render: () => <UsageGallery />,
};

export const Atoms: Story = {
  render: () => <UsageGallery groups={[componentUsageGroups[0]!]} />,
};

export const FormControls: Story = {
  render: () => <UsageGallery groups={[componentUsageGroups[1]!]} />,
};

export const DisclosureAndNavigation: Story = {
  render: () => <UsageGallery groups={[componentUsageGroups[2]!]} />,
};

export const OverlaysAndMenus: Story = {
  render: () => <UsageGallery groups={[componentUsageGroups[3]!]} />,
};

export const CompoundAndData: Story = {
  render: () => <UsageGallery groups={[componentUsageGroups[4]!]} />,
};

export const MuiParityComponents: Story = {
  render: () => (
    <div className="max-w-7xl p-4">
      <MuiMaterialPropsGalleryStory />
    </div>
  ),
};
