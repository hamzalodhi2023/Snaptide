let navigate;

export const setNavigate = (navFn) => {
  navigate = navFn;
};

export const getNavigate = () => navigate;
