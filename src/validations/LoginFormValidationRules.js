
export default function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email adresi zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email adresi geçersiz';
    }
    if (!values.password) {
      errors.password = 'Şifre zorunludur.';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be 6 or more characters';
    }
    return errors;
  };