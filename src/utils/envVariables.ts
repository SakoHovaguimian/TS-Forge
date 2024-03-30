import { z } from "zod";

const envVariables = z.object({
  DATABASE_URL: z.string(),
  CUSTOM_STUFF: z.string(),
});

envVariables.parse(process.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
