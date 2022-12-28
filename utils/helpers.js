module.exports = {
    format_data: (datos) => {
        var dat = JSON.parse(datos);
        return JSON.stringify(datos);
    },
    filter_commentPost : (data, postId) => {
        const filter = data.filter(row => row.post_id == postId);        
        return filter;
    }
  };
  