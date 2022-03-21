const handle = (error, msg) => {
  console.log(error);
    if(error.status === 401) {
        sessionStorage.clear();
        return msg + 'Unauthorized'
    }
    if(error.status === 500) {
        return msg + 'Interal error'
    }
    if (error.data) {
        return msg + error.data.message;
    } else {
        return msg + error;
    }
}

export default handle;
