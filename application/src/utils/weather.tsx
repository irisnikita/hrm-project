// Icons
import { BedIcon, MoonIcon, SunIcon, SunsetIcon } from 'lucide-react';

// Types
import { Greeting } from '@/types';

/**
 * Generates a greeting based on the current time of day.
 *
 * @async
 * @function getGreeting
 * @param {Object} params - The parameters for the function.
 * @param {Function} params.t - The translation function from next-intl.
 * @returns {Promise<Greeting>} A Promise that resolves to a Greeting object containing a message and an Icon component.
 * @description
 * This function determines the appropriate greeting and icon based on the current hour:
 * - Before 12 PM: "Good Morning" with a SunIcon
 * - 12 PM to 5:59 PM: "Good Afternoon" with a SunsetIcon
 * - 6 PM to 8:59 PM: "Good Evening" with a MoonIcon
 * - 9 PM onwards: "Good Night" with a BedIcon
 * The greeting messages are localized using the provided translation function.
 */
export const getGreeting = async (): Promise<Greeting> => {
  const greeting: Greeting = {
    message: '',
    Icon: null,
  };

  const hour = new Date().getHours();

  switch (true) {
    case hour < 12: {
      greeting.message = 'greeting.goodMorning';
      greeting.Icon = SunIcon;

      break;
    }
    case hour < 18: {
      greeting.message = 'greeting.goodAfternoon';
      greeting.Icon = SunsetIcon;
      break;
    }
    case hour <= 24: {
      greeting.message = 'greeting.goodEvening';
      greeting.Icon = MoonIcon;
      break;
    }
    default: {
      greeting.message = 'greeting.goodNight';
      greeting.Icon = BedIcon;
      break;
    }
  }

  return greeting;
};
