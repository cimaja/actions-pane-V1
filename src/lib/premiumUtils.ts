// Utility functions for premium feature handling
import { apps } from '../data/apps';

// Create a cached list of premium connector IDs and name patterns
const premiumConnectorIds: string[] = [];
const premiumConnectorPatterns: RegExp[] = [];
const premiumConnectorNames: string[] = [];

// Initialize the premium connector data
function initPremiumConnectorData() {
  // Only initialize once
  if (premiumConnectorIds.length > 0) return;
  
  // Find all premium apps
  const premiumApps = apps.filter(app => app.premium === true);
  
  // Extract IDs and create name patterns
  premiumApps.forEach(app => {
    premiumConnectorIds.push(app.id);
    premiumConnectorNames.push(app.name);
    // Create a case-insensitive regex that matches the app name at the start of a string
    premiumConnectorPatterns.push(new RegExp(`^${app.name.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i'));
  });
}

/**
 * Check if an action belongs to a premium connector
 * @param actionId The ID of the action to check
 * @returns True if the action belongs to a premium connector
 */
export function isPremiumConnectorAction(actionId: string): boolean {
  // Initialize premium connector data if needed
  initPremiumConnectorData();
  
  // Check if the action ID starts with any premium connector ID
  const matchingConnectorId = premiumConnectorIds.find(connectorId => 
    actionId.toLowerCase().startsWith(connectorId.toLowerCase() + '-') || 
    actionId.toLowerCase() === connectorId.toLowerCase()
  );
  
  // Check if the action name contains any premium connector name
  const matchingPattern = premiumConnectorPatterns.find(pattern => 
    pattern.test(actionId)
  );
  
  // Direct name matching - check if the action contains any premium connector name
  const directNameMatch = premiumConnectorNames.find(name => 
    actionId.toLowerCase().includes(name.toLowerCase())
  );
  
  // Special case handling for known premium services
  const knownPremiumKeywords = ['Adobe Acrobat Sign', 'Adobe Sign', 'Acrobat Sign'];
  const isKnownPremium = knownPremiumKeywords.some(keyword => 
    actionId.includes(keyword)
  );
  
  // For debugging - log matches for Adobe and Asana actions
  if (actionId.includes('Adobe') || actionId.includes('Asana')) {
    console.log(`Action check: ${actionId}`);
    console.log(`- ID match: ${matchingConnectorId || 'none'}`);
    console.log(`- Pattern match: ${matchingPattern ? matchingPattern.toString() : 'none'}`);
    console.log(`- Direct name match: ${directNameMatch || 'none'}`);
    console.log(`- Known premium: ${isKnownPremium}`);
    console.log(`- Result: ${Boolean(matchingConnectorId || matchingPattern || directNameMatch || isKnownPremium)}`);
  }
  
  return Boolean(matchingConnectorId || matchingPattern || directNameMatch || isKnownPremium);
}

/**
 * Check if an action should be disabled based on premium status
 * @param actionId The ID of the action to check
 * @param isPremiumUser Whether the user has premium status
 * @returns True if the action should be disabled
 */
export function isActionDisabled(actionId: string, isPremiumUser: boolean): boolean {
  // If the user is premium, never disable actions
  if (isPremiumUser) {
    return false;
  }
  
  // Check if it's a premium connector action
  return isPremiumConnectorAction(actionId);
}

/**
 * Debug function to log premium connector information
 * This is useful for troubleshooting premium action detection
 */
export function debugPremiumConnectors(): void {
  initPremiumConnectorData();
  console.log('Premium Connector IDs:', premiumConnectorIds);
  console.log('Premium Connector Patterns:', premiumConnectorPatterns.map(p => p.toString()));
  
  // Log all premium apps
  const premiumApps = apps.filter(app => app.premium === true);
  console.log('Premium Apps:', premiumApps.map(app => ({ id: app.id, name: app.name })));
}
