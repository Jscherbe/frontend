// Responsible for watching and rebuilding sassdocs data
import fs from 'fs-extra'
import path from 'path'
import sassdoc from 'sassdoc'
import chokidar from 'chokidar'

const dir = path.resolve('././../scss');
const outputFile = path.resolve(__dirname, "../content/sassdocs.json");
let building;

export default async function asyncModule() {
  console.log('Initialize sassdoc module...');
  await update();
  // Only when serving
  if (this.options.server) {}
    this.nuxt.hook('build:compiled', () => {
      console.log('Attaching sass watcher...');
      chokidar.watch(`${ dir }/**/*.scss`).on('all', update);
    });
    this.nuxt.hook('close', async () => {
      console.log('Removing sass watcher...');
      await watcher.close();
    });
  }
}

function update() {
  // No building multiple times (has to finish before next trigger)
  if (building) return; 
  building = true;
  console.log("Rebuilding sass JSON...");
  return sassdoc
    .parse(dir)
    .then((data) => {
      console.log("Writing sassdoc JSON...");
      return fs.writeFile(outputFile, JSON.stringify({
        data
      }, null, 2));
    })
    .then(() => {
      console.log("Finished sassdoc JSON...");
      building = false;
    });
}
