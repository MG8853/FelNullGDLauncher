const { Client } = require('discord-rpc');
const log = require('electron-log');

let client;
let activity;

const initialAppStartup = Math.floor(Date.now() / 1000);

const defaultValue = {
  details: 'Playing FelNullGDLauncher',
  startTimestamp: initialAppStartup,
  largeImageKey: 'general',
  largeImageText: 'FelNullGDLauncher - TeamFelNull Minecraft Launcher',
  instance: false
};

exports.initRPC = () => {
  client = new Client({ transport: 'ipc' });

  activity = defaultValue;

  client.on('ready', () => {
    log.log('Discord RPC Connected');
    client.setActivity(activity);
  });

  client.login({ clientId: '709790494020075551' }).catch(error => {
    if (error.message.includes('ENOENT')) {
      log.error('Unable to initialize Discord RPC, no client detected.');
    } else {
      log.error('Unable to initialize Discord RPC:', error);
    }
  });
};

exports.update = details => {
  if (!client) return;
  activity = {
    ...activity,
    startTimestamp: Math.floor(Date.now() / 1000),
    details: `Playing ${details}`
  };
  client.setActivity(activity);
};

exports.reset = () => {
  if (!client) return;
  activity = defaultValue;
  activity.startTimestamp = initialAppStartup;
  client.setActivity(activity);
};

exports.shutdownRPC = () => {
  if (!client) return;
  client.clearActivity();
  client.destroy();
  client = null;
  activity = null;
};
