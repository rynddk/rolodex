export const formatDataForExport = (data) => {
    console.log(data);

    return data.map((item) => ({
        'gender': item.gender,
        'name.first': item.name.first,
        'name.last': item.name.last,
        'email': item.email,
        'phone': item.phone,
        'picture.large': item.picture.large,
        'picture.medium': item.picture.medium,
        'picture.thumbnail': item.picture.thumbnail
    }));
};
