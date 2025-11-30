// ============================================================================
// CAPTAIN CULINARY - TYPE DEFINITIONS
// ============================================================================

export interface User {
  email: string;
  name: string;
}

export interface UserProgress {
  [moduleId: string]: {
    [lessonId: string]: boolean;
  };
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  icon?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  estimatedTime?: number;
}

export interface ChefPersona {
  id: string;
  name: string;
  description: string;
  inspiration: string;
  avatar: string;
  specialty: string;
}
