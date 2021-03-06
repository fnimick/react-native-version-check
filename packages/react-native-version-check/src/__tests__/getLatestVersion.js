jest.mock('react-native');

import { setVersionInfo } from '../versionInfo';
import VersionInfo from '../RNVersionInfo';

setVersionInfo(VersionInfo);

import { getLatestVersion } from '../getLatestVersion';

describe('getLatestVersion', () => {
  it('get latest version properly', async () => {
    if (process.env.RNVC_DEVICE === 'android') {
      getLatestVersion().catch(err => expect(err).toBeDefined());
    } else {
      getLatestVersion().then(r => expect(typeof +r === 'number').toBeTruthy());
    }
  });

  it('reject with invalid response', () => {
    getLatestVersion({
      provider: () => fetch('http://invalid.url/'),
    })
      .then(() => {
        throw new Error();
      })
      .catch(e => expect(e).not.toBeNull());
  });
});
