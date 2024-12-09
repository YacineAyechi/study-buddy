export const getInitials = (firstName, lastName) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};

export const getAvatarColor = (initials) => {
  // Generate a consistent color based on initials
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to RGB color
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`;
};
