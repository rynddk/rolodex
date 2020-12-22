const defaultPerPage = 10;

export const formatRequestUrl = (page = 1, perPage = defaultPerPage) => `https://randomuser.me/api/?page=${page}&results=${perPage}&inc=gender,name,picture,email,phone,id&seed=e9649cdad6d59e77`;
