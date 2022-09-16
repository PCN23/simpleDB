const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('construct directory', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('needs to construct directory', async () => {
    const src = path.join(TEST_DIR, 'src');
    await fs.mkdir(src);
    await fs.writeFile(path.join(src, 'boat.txt'), 'boat 1');
    const dest = path.join(TEST_DIR, 'dest');

    // (Name this the class name in lib file )
    await SimpleDb (src, dest);

    const files = await fs.direc(dest);
    expect(files).toEqual(expect.arrayContaining([
      'boat.txt'
    ]));

  });

});
