import { defineCliConfig } from 'sanity/cli';
import project from '../sanity.project.json';

export default defineCliConfig({
  api: {
    projectId: project.projectId,
    dataset: project.dataset
  },
  // Fixed hostname so `npm run deploy` never re-prompts.
  // Resolves to https://<studioHost>.sanity.studio/
  studioHost: project.studioHost
});
