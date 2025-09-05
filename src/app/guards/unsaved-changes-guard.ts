import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../models/can-component-deactivate';

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.hasUnSavedChanges? window.confirm("Discard Changes?") : true;
};
