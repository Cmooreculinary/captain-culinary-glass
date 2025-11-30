import React, { useEffect } from 'react';

/**
 * CastReceiver Component
 * 
 * Enables Chromecast and AirPlay functionality for Captain Culinary
 * Allows users to cast cooking instructions from phone to TV
 * 
 * Key Differentiator: Seamless phone-to-TV experience while cooking
 */

const CastReceiver: React.FC = () => {
  useEffect(() => {
    // Initialize cast receiver if available
    if (window.cast && window.cast.framework) {
      const context = window.cast.framework.CastReceiverContext.getInstance();
      
      const options = new window.cast.framework.CastReceiverOptions();
      options.disableIdleTimeout = true; // Keep connection alive during cooking
      
      context.start(options);
      
      // Listen for messages from sender (phone)
      context.addCustomMessageListener(
        'urn:x-cast:com.captainculinary',
        (customEvent: any) => {
          console.log('Received message from sender:', customEvent.data);
          // Handle cooking instructions, recipes, etc.
        }
      );
    }
    
    return () => {
      // Cleanup on unmount
      if (window.cast && window.cast.framework) {
        const context = window.cast.framework.CastReceiverContext.getInstance();
        context.stop();
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default CastReceiver;

// TypeScript declarations for cast framework
declare global {
  interface Window {
    cast: any;
  }
}
