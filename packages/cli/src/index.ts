import { Command } from 'commander';
import kleur from 'kleur';
import prompts from 'prompts';
import ora from 'ora';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { REGISTRY, resolveDependencies } from './registry';

const program = new Command();

program
  .name('aura-ui')
  .description('CLI for adding @aura-ui components to your project')
  .version('0.0.1');

program
  .command('init')
  .description('Initialize aura-ui in your project')
  .action(async () => {
    console.log(kleur.bold().cyan('\n  aura-ui · init\n'));

    const answers = await prompts([
      {
        type: 'select',
        name: 'theme',
        message: 'Pick a base theme',
        choices: [
          { title: 'slate', value: 'slate' },
          { title: 'zinc', value: 'zinc' },
          { title: 'rose', value: 'rose' },
        ],
        initial: 0,
      },
      {
        type: 'text',
        name: 'dir',
        message: 'Components directory',
        initial: 'src/components/ui',
      },
    ]);

    const spinner = ora('Setting up aura-ui').start();
    try {
      await fs.mkdir(answers.dir, { recursive: true });
      await fs.writeFile(
        'aura-ui.config.json',
        JSON.stringify(
          { theme: answers.theme, componentsDir: answers.dir, version: '0.0.1' },
          null,
          2,
        ),
      );
      spinner.succeed('Done!');
      console.log(kleur.dim(`\n  Config written to ${kleur.cyan('aura-ui.config.json')}`));
      console.log(kleur.dim(`  Add components with ${kleur.cyan('npx aura-ui add <name>')}`));
      console.log(kleur.dim(`  List components with ${kleur.cyan('npx aura-ui list')}\n`));
    } catch (err) {
      spinner.fail('Failed');
      console.error(err);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List components available in the registry')
  .action(() => {
    console.log(kleur.bold().cyan('\n  Available components:\n'));
    Object.keys(REGISTRY)
      .sort()
      .forEach((name) => console.log(`  • ${kleur.cyan(name)}`));
    console.log('');
  });

program
  .command('add <components...>')
  .description('Add one or more components to your project (resolves dependencies)')
  .option('--cwd <path>', 'Working directory', process.cwd())
  .option('--source <path>', 'Path to @aura-ui/styled/src for inlining')
  .action(async (components: string[], opts: { cwd: string; source?: string }) => {
    const configPath = path.join(opts.cwd, 'aura-ui.config.json');
    const configRaw = await fs.readFile(configPath, 'utf8').catch(() => null);
    if (!configRaw) {
      console.error(kleur.red('No aura-ui.config.json found. Run `npx aura-ui init` first.'));
      process.exit(1);
    }
    const config = JSON.parse(configRaw) as { componentsDir: string };
    const outDir = path.resolve(opts.cwd, config.componentsDir);
    await fs.mkdir(outDir, { recursive: true });

    const visited = new Set<string>();
    const toCopy: string[] = [];
    for (const name of components) {
      if (!REGISTRY[name]) {
        console.error(kleur.red(`Unknown component: ${name}`));
        process.exit(1);
      }
      for (const dep of resolveDependencies(name, visited)) {
        if (!toCopy.includes(dep)) toCopy.push(dep);
      }
    }

    const sourceRoot =
      opts.source ?? path.resolve(opts.cwd, 'node_modules/@aura-ui/styled/src');
    const spinner = ora(`Adding ${toCopy.join(', ')}`).start();
    const installed: string[] = [];
    const npmDeps = new Set<string>();
    try {
      for (const name of toCopy) {
        const entry = REGISTRY[name];
        if (!entry || !entry.sourcePath) continue;
        const src = path.join(sourceRoot, entry.sourcePath);
        const dest = path.join(outDir, `${entry.name}.tsx`);
        try {
          const content = await fs.readFile(src, 'utf8');
          await fs.writeFile(dest, content);
          installed.push(`${kleur.cyan(name)} → ${kleur.dim(path.relative(opts.cwd, dest))}`);
        } catch {
          await fs.writeFile(
            dest,
            `// ${name} component scaffold (source not found at ${src})\n// Run with --source to point at @aura-ui/styled/src.\n`,
          );
          installed.push(`${kleur.yellow(name)} (stub, source not found)`);
        }
        entry.npmDependencies?.forEach((d) => npmDeps.add(d));
      }
      spinner.succeed('Done');
      installed.forEach((line) => console.log(`  ${line}`));
      if (npmDeps.size > 0) {
        console.log(
          `\n${kleur.bold('Install required npm packages:')}\n  ${kleur.cyan(`pnpm add ${[...npmDeps].join(' ')}`)}`,
        );
      }
    } catch (err) {
      spinner.fail('Failed');
      console.error(err);
      process.exit(1);
    }
  });

program.parse();
