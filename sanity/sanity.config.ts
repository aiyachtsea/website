import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import project from '../sanity.project.json';

export default defineConfig({
  name: 'aiyachts',
  title: 'AIyachts',
  projectId: project.projectId,
  dataset: project.dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: project.apiVersion })],
  schema: { types: schemaTypes }
});
