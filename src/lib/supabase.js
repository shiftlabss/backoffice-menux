import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing! Check your .env file for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  );

  // Create a mock client/proxy to prevent crash on usage, 
  // but it will fail on actual calls if not handled.
  // For the purpose of the prototype not crashing:
  // Chainable Mock Builder to support syntax: supabase.from().select().eq().order()
  const createMockBuilder = (data = []) => {
    const builder = {
      select: () => builder,
      insert: () => {
        // In a real mock we might update internal state, but for now just return success
        return Promise.resolve({ data, error: null });
      },
      update: () => builder,
      delete: () => builder,
      eq: () => builder,
      neq: () => builder,
      order: () => builder,
      limit: () => builder,
      single: () => Promise.resolve({ data: null, error: null }),
      // Make the builder awaitable (Thenable)
      then: (resolve) => resolve({ data, error: null })
    };
    return builder;
  };

  supabase = {
    from: () => createMockBuilder([]),
    channel: () => ({
      on: () => ({ on: () => ({ subscribe: () => { } }) }),
      subscribe: () => { }
    }),
    removeChannel: () => { }
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
