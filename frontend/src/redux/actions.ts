export const openSnackbar = ({ message, severity }) => ({
  type: 'OPEN_SNACKBAR',
  message,
  severity,
});

export const closeSnackbar = () => ({
  type: 'CLOSE_SNACKBAR',
});

export const openModal = ({ room, day }) => ({
  type: 'OPEN_MODAL',
  room,
  day,
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});
