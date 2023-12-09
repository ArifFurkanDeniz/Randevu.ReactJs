import axios from "axios";
import authHeader from "./auth-header";
import getApiRoot from "./api-root";
import tokenControl from "./axios-401-response-interceptor";

tokenControl();

const API_URL = getApiRoot() +"Date/";


const dateUserControl = (id, userId, dateTime, dateHour) => {

  if (id == undefined) {
    id = 0;
  }
  let header = authHeader();

  let query ='?Id='+id  +'&DateTime='+ dateTime + 'T' + dateHour + ':00';

    query += '&UserId='+ userId
  


  return axios
  .get(API_URL + 'DateUserControl'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const dateRoomControl = (id, roomId, dateTime, dateHour) => {

  if (id == undefined) {
    id = 0;
  }
  let header = authHeader();

  let query ='?Id='+id  +'&DateTime='+ dateTime+ 'T' + dateHour + ':00';
  if (roomId!=null) {
    query += '&RoomId='+ roomId
  }
 

  return axios
  .get(API_URL + 'DateRoomControl'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const deleteDate = (id) => {
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Delete'+ query, { headers: header })
  .then((response) => {
    return response;
  });
}

const save = (date) => {
  let header = authHeader();
  date.dateTime = date.dateTime+'T'+date.dateHour+":00";
  return axios
  .post(API_URL + 'Save', date, { headers: header })
  .then((response) => {
    return response;
  });
}


const getDate = (id) => {
  let header = authHeader();
  let query ='?Id='+id;

  return axios
  .get(API_URL + 'Get2'+ query,  { headers: header })
  .then((response) => {
    return response;
  });
}

const getDates = (page,date1,date2,user1s,user2,client, orderByUser, isFree, comingCase, costStatus, directional, pagesize = 50) => {

  if(user1s.length == 0)
  {
    user1s=null;
  }

  if(user2==0)
  {
    user2=null;
  }

  if(comingCase==0)
  {
    comingCase=null;
  }

  if(costStatus=='')
  {
    costStatus=null;
  }

  if(client=='')
  {
    client=null;
  }

  if(directional=='')
  {
    directional=null;
  }

  if(page==0)
  {
    page =1;
  }

  if (orderByUser==1) {
    orderByUser = true;
  }
  else{
    orderByUser = false;
  }

  let header = authHeader();
  let query ='?Page='+page+'&Pagesize='+ pagesize + "&orderByUser="+ orderByUser+"&isFree="+isFree;

  if(date1!=null)
  {
    query += '&Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }
  
  if(user1s!=null)
  {
    let index = 0;
    user1s.forEach(element => {
      query += '&user1Ids['+index+']=' + element.value;
      index++;
    });
  }

  if(user2!=null)
  {
    let index = 0;
    user2.forEach(element => {
      query += '&User2Ids['+index+']=' + element.value;
      index++;
    });
  }

  if(comingCase!=null)
  {
    let index = 0;
    comingCase.forEach(element => {
      query += '&ComingCase['+index+']=' + element.value;
      index++;
    });
  }


  if(costStatus!=null)
  {
    let index = 0;
    costStatus.forEach(element => {
      query += '&CostStatus['+index+']=' + element.value;
      index++;
    });
  }


  if(client!=null)
  {
    query += '&Client=' + client;
  }

  if(directional!=null)
  {
    query += '&Directional=' + directional;
  }

  return axios
    .get(API_URL + 'GetList' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};


const getDatesForExcel = (page,date1,date2,user1s,user2,client, orderByUser, isFree, comingCase, costStatus, directional, pagesize = 1000000000) => {

  if(user1s.length == 0)
  {
    user1s=null;
  }

  if(user2==0)
  {
    user2=null;
  }

  if(comingCase==0)
  {
    comingCase=null;
  }

  if(costStatus=='')
  {
    costStatus=null;
  }

  if(client=='')
  {
    client=null;
  }

  if(directional=='')
  {
    directional=null;
  }

  if(page==0)
  {
    page =1;
  }

  if (orderByUser==1) {
    orderByUser = true;
  }
  else{
    orderByUser = false;
  }

  let header = authHeader();
  let query ='?Page='+page+'&Pagesize='+ pagesize + "&orderByUser="+ orderByUser+"&isFree="+isFree;

  if(date1!=null)
  {
    query += '&Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }
  
  if(user1s!=null)
  {
    let index = 0;
    user1s.forEach(element => {
      query += '&user1Ids['+index+']=' + element.value;
      index++;
    });
  }

  if(user2!=null)
  {
    let index = 0;
    user2.forEach(element => {
      query += '&User2Ids['+index+']=' + element.value;
      index++;
    });
  }

  if(comingCase!=null)
  {
    let index = 0;
    comingCase.forEach(element => {
      query += '&ComingCase['+index+']=' + element.value;
      index++;
    });
  }


  if(costStatus!=null)
  {
    let index = 0;
    costStatus.forEach(element => {
      query += '&CostStatus['+index+']=' + element.value;
      index++;
    });
  }


  if(client!=null)
  {
    query += '&Client=' + client;
  }

  if(directional!=null)
  {
    query += '&Directional=' + directional;
  }

  // return axios
  //   .get(API_URL + 'GetListExcel' + query,  { headers: header })
  //   .then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]))
  //     const link = document.createElement('a')
  //     link.href = url
  //     link.setAttribute('download', "Excel.xlsx")
  //     document.body.appendChild(link)
  //     link.click()
  //   });

  //window.open(API_URL + 'GetListExcel' + query, );



    // Change this to use your HTTP client
        fetch(API_URL + 'GetListExcel' + query,  { headers: header } ) // FETCH BLOB FROM IT
          .then((response) => response.blob())
          .then((blob) => { // RETRIEVE THE BLOB AND CREATE LOCAL URL
            var _url = window.URL.createObjectURL(blob);
            window.open(_url, "_blank").focus(); // window.open + focus
        }).catch((err) => {
          console.log(err);
        });

};


const getDatesForGroup = (page,date1,date2,user1s,user2s,client, isFree, comingCase, costStatus, directional) => {
  debugger;
  if(user1s.length == 0)
  {
    user1s=null;
  }

  if(user2s.length == 0)
  {
    user2s=null;
  }

  if(comingCase==0)
  {
    comingCase=null;
  }

  if(costStatus=='')
  {
    costStatus=null;
  }

  if(client=='')
  {
    client=null;
  }

  if(directional=='')
  {
    directional=null;
  }

  if(page==0)
  {
    page =1;
  }

  let header = authHeader();
  let query ='?Page='+page+'&Pagesize=50' + "&isFree="+isFree;

  if(date1!=null)
  {
    query += '&Date1=' + date1;
  }

  if(date2!=null)
  {
    query += '&Date2=' + date2;
  }

  if(user1s!=null)
  {
    let index = 0;
    user1s.forEach(element => {
      query += '&user1Ids['+index+']=' + element.value;
      index++;
    });
  }

  if(user2s!=null)
  {
    let index = 0;
    user2s.forEach(element => {
      query += '&User2Ids['+index+']=' + element.value;
      index++;
    });
  }

  if(comingCase!=null)
  {
    let index = 0;
    comingCase.forEach(element => {
      query += '&ComingCase['+index+']=' + element.value;
      index++;
    });
  }


  if(costStatus!=null)
  {
    let index = 0;
    costStatus.forEach(element => {
      query += '&CostStatus['+index+']=' + element.value;
      index++;
    });
  }
  if(client!=null)
  {
    query += '&Client=' + client;
  }

  if(directional!=null)
  {
    query += '&Directional=' + directional;
  }

  return axios
    .get(API_URL + 'GetListGroup' + query,  { headers: header })
    .then((response) => {
      return response;
    });
};

export default {
  dateUserControl,
  dateRoomControl,
  deleteDate,
  save,
  getDate,
  getDates,
  getDatesForGroup,
  getDatesForExcel
};

// const API_URL = "http://localhost:8080/api/test/";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

// const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

// export default {
//   getPublicContent,
//   getUserBoard,
//   getModeratorBoard,
//   getAdminBoard,
// };

//http://localhost:5000/api/WebUser?$expand=AppPurchases($select=StatusId)&$filter=StatusId%20eq%201&$Select=Id,FullName,Email,TypeId,GoogleId,StatusId
