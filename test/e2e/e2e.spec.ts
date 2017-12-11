import * as electronPath from 'electron';
import * as path from 'path';

const { Application } = require('spectron');

const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  let app: any;
  beforeAll(async () => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', '..', 'app')],
    });
    return app.start();
  });

  afterAll(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('should open window', async () => {
    const { client, browserWindow } = app;

    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    expect(title).toBe('Hello Electron React!');
  });

  it('should not have any logs in console of main window', async () => {
    const { client } = app;
    const logs = await client.getRenderProcessLogs();
    // Print renderer process logs
    logs.forEach((log: any) => {
      console.log(log.message);
      console.log(log.source);
      console.log(log.level);
    });
    expect(logs).toHaveLength(0);
  });
});
