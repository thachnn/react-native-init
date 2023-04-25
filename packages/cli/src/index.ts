import {logger} from '@react-native-community/cli-tools';
import type {
  Command,
  Config,
  DetachedCommand,
} from '@react-native-community/cli-types';
import chalk from 'chalk';
import {Command as CommanderCommand} from 'commander';
import init from './commands/init';
const detachedCommands = [init as DetachedCommand];

const pkgVersion = require('../package.json').version;

const program = new CommanderCommand()
  .version(pkgVersion, '-v', 'Output the current version')
  .option('--verbose', 'Increase logging verbosity');

const handleError = (err: Error) => {
  logger.enable();
  if (program.opts().verbose) {
    logger.error(err.message);
  } else {
    // Some error messages (esp. custom ones) might have `.` at the end already.
    const message = err.message.replace(/\.$/, '');
    logger.error(`${message}.`);
  }
  if (err.stack) {
    logger.log(err.stack);
  }
  if (!program.opts().verbose) {
    logger.info(
      chalk.dim(
        `Run CLI with ${chalk.reset('--verbose')} ${chalk.dim(
          'flag for more details.',
        )}`,
      ),
    );
  }
  process.exit(1);
};

function printExamples(examples: Command['examples']) {
  let output: string[] = [];

  if (examples && examples.length > 0) {
    const formattedUsage = examples
      .map((example) => `  ${example.desc}: \n  ${chalk.cyan(example.cmd)}`)
      .join('\n\n');

    output = output.concat([chalk.bold('\nExample usage:'), formattedUsage]);
  }

  return output.join('\n').concat('\n');
}

/**
 * Custom type assertion needed for the `makeCommand` conditional
 * types to be properly resolved.
 */
function isDetachedCommand(
  command: Command<boolean>,
): command is DetachedCommand {
  return command.detached === true;
}

function isAttachedCommand(
  command: Command<boolean>,
): command is Command<false> {
  return !isDetachedCommand(command);
}

/**
 * Attaches a new command onto global `commander` instance.
 *
 * Note that this function takes additional argument of `Config` type in case
 * passed `command` needs it for its execution.
 */
function attachCommand<C extends Command<boolean>>(
  command: C,
  config: C extends DetachedCommand ? Config | undefined : Config,
): void {
  const cmd = program
    .action(async function handleAction(
      this: CommanderCommand,
      ...args: string[]
    ) {
      const passedOptions = this.opts();
      const argv = Array.from(args).slice(0, -1);

      try {
        if (isDetachedCommand(command)) {
          await command.func(argv, passedOptions, config);
        } else if (isAttachedCommand(command)) {
          await command.func(argv, config, passedOptions);
        } else {
          throw new Error('A command must be either attached or detached');
        }
      } catch (error) {
        handleError(error as Error);
      }
    });

  const parts = command.name.match(/([^ ]+) *(.*)/);
  if (parts) {
    cmd.name(`react-native-${parts[1]}`);
    if (parts[2]) cmd.arguments(parts[2]);
  }
  if (command.description) {
    cmd.description(command.description);
  }

  cmd.addHelpText('after', printExamples(command.examples));

  for (const opt of command.options || []) {
    cmd.option(
      opt.name,
      opt.description ?? '',
      opt.parse || ((val: any) => val),
      typeof opt.default === 'function' ? opt.default(config) : opt.default,
    );
  }
}

async function run() {
  try {
    await setupAndRun();
  } catch (e) {
    handleError(e as Error);
  }
}

async function setupAndRun() {
  // Commander is not available yet


  logger.setVerbose(process.argv.includes('--verbose'));


    for (const command of detachedCommands) {
      attachCommand(command, undefined /*config*/);
    }

  program.parse(process.argv);
}


export {run};
