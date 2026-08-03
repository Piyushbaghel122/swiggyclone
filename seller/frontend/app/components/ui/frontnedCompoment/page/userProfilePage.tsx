"use client";

import {
  UserProfileProvider,
  UserProfileAccountPanel,
  UserProfileProfileSection,
  UserProfileEmailSection,
  UserProfilePhoneSection,
} from '@clerk/ui/experimental'

export default function UserProfilePage() {
  return (
    <UserProfileProvider>
      <UserProfileAccountPanel>
        <UserProfileProfileSection />
        <UserProfileEmailSection />
        <UserProfilePhoneSection />
      </UserProfileAccountPanel>
    </UserProfileProvider>
  )
}
