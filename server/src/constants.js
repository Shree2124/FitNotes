const options = {
    // domain: 'fitnotes-six.vercel.app',
    httpOnly: true,           
    secure: true,              
    sameSite: 'None',          
    path: '/',                 
    maxAge: 15 * 60 * 1000
};

export {
    options
}