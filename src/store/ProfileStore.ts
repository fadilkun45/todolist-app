import type { userProfile } from '@/interface/rbac/user';
import { create } from 'zustand';


export interface ProfileState {
    profile: userProfile | null ;
    setProfile: (newProfile: userProfile) => void;
}

const profileStore = create<ProfileState>((set) => ({
    profile: null,
    setProfile: (newProfile) => set({ profile: newProfile }),
}));

export default profileStore;