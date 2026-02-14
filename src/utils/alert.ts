import Swal, { SweetAlertIcon } from 'sweetalert2';

/**
 * Common Reusable Alert (Success, Error, Info)
 */
export const showAppAlert = async (
  title: string,
  text: string,
  icon: SweetAlertIcon = 'info'
) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#2563eb',
    confirmButtonText: 'OK',
    customClass: {
      popup: 'rounded-lg',
    }
  });
};

/**
 * Common Confirmation Alert
 */
export const showConfirmDialog = async (
  title: string, 
  text: string
) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Yes, proceed!',
    cancelButtonText: 'Cancel',
    reverseButtons: true // Better UX for desktop users
  });
};

/**
 * Common Loading Alert
 * Prevents the user from clicking away while a process is running
 */
export const showLoadingAlert = (title: string = 'Processing...', text: string = 'Please wait') => {
  Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
    customClass: {
      popup: 'rounded-lg',
    }
  });
};

/**
 * Helper to manually close any open SweetAlert
 */
export const closeAlert = () => {
  Swal.close();
};