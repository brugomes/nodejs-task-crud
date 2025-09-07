import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

async function sendTask(task) {
  const response = await fetch('http://localhost:3333/task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Error on creating task: ${response.statusText}`);
  }
}

async function importTasksFromCSV() {
  const csvPath = path.resolve(__dirname, 'listTasks.csv');

  const parser = fs.createReadStream(csvPath).pipe(parse({ columns: true, trim: true }));

  for await (const record of parser) {
    const { title, description } = record;
    await sendTask({ title, description });
  }

  console.log('Upload complete!');
}

importTasksFromCSV().catch((err) => {
  console.error('Error importing tasks:', err);
});
