import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function useAudit() {
  /**
   * Log an action for audit purposes.
   * @param {string} actionId - The unique identifier for the action (e.g., 'dashboard.kpi.open').
   * @param {object} metadata - Additional context about the action.
   */
  const log = useCallback((actionId, metadata = {}) => {
    // 1. Console log for development visibility
    console.log(`%c[AUDIT] ${actionId}`, 'color: #10b981; font-weight: bold;', metadata);

    // 2. Here we would normally send to Supabase/Backend
    // Example: supabase.from('audit_logs').insert({ action_id: actionId, metadata, user_id: ... })
  }, []);

  /**
   * Log a mutation action (create/update/delete).
   * @param {string} actionId - The unique identifier for the action.
   * @param {object} metadata - Additional context.
   */
  const logMutation = useCallback((actionId, metadata = {}) => {
    log(actionId, { ...metadata, type: 'mutation' });
    // This could also trigger a specific toast or sound if needed
  }, [log]);

  return { log, logMutation };
}
