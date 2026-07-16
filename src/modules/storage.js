import { themes as defaultThemes } from '../data/themes.js';

const STORAGE_KEY = 'google_fresher_party_planner_data';

export const storage = {
  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initialData = {
        themes: defaultThemes,
        activeThemeId: 'galactic-carnival',
        uploadedPosters: {}, // map of themeId -> dataUrl/url
        checklist: {
          concept: false,
          games: false,
          quiz: false,
          welcome: false,
          schedule: false,
          poster: false,
          pitch: false
        }
      };
      this.save(initialData);
      return initialData;
    }
    try {
      const parsed = JSON.parse(data);
      if (!parsed.checklist) {
        parsed.checklist = {
          concept: false,
          games: false,
          quiz: false,
          welcome: false,
          schedule: false,
          poster: false,
          pitch: false
        };
      }
      if (!parsed.uploadedPosters) {
        parsed.uploadedPosters = {};
      }
      if (!parsed.themes || parsed.themes.length === 0) {
        parsed.themes = defaultThemes;
      } else {
        if (!parsed.organizer) {
          parsed.organizer = { name: '', email: '', role: '' };
        }
        // Validation merge: Ensure new properties exist on all loaded themes
        parsed.themes.forEach(theme => {
          const defaultTheme = defaultThemes.find(dt => dt.id === theme.id);
          if (defaultTheme) {
            if (!theme.budget) theme.budget = { ...defaultTheme.budget };
            if (!theme.mocktails) theme.mocktails = [ ...defaultTheme.mocktails ];
            if (!theme.playlist) theme.playlist = [ ...defaultTheme.playlist ];
            if (!theme.tasks) theme.tasks = [ ...defaultTheme.tasks ];
            if (!theme.layoutItems) theme.layoutItems = [ ...defaultTheme.layoutItems ];
            if (!theme.seatingTables) theme.seatingTables = [ ...defaultTheme.seatingTables ];
            if (!theme.attendees) theme.attendees = [ ...defaultTheme.attendees ];
            if (!theme.socialCalendar) theme.socialCalendar = [ ...defaultTheme.socialCalendar ];
            if (!theme.cateringEstimate) theme.cateringEstimate = { ...defaultTheme.cateringEstimate };
            if (!theme.sponsorship) theme.sponsorship = { ...defaultTheme.sponsorship };
            if (!theme.geminiIterations) theme.geminiIterations = [ ...defaultTheme.geminiIterations ];
            if (!theme.swagList) theme.swagList = [ ...defaultTheme.swagList ];
            if (!theme.posterMockup) theme.posterMockup = { ...defaultTheme.posterMockup };
          }
        });
      }
      return parsed;
    } catch (e) {
      console.error('Error parsing storage data, resetting...', e);
      return {
        themes: defaultThemes,
        activeThemeId: 'galactic-carnival',
        uploadedPosters: {},
        checklist: {
          concept: false,
          games: false,
          quiz: false,
          welcome: false,
          schedule: false,
          poster: false,
          pitch: false
        }
      };
    }
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    return this.load();
  }
};
