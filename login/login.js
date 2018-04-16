
function show(node) {
  node.style.color = "#f5222d";
} 
function hide(node) {
  node.style.color = "transparent";
}
 
function detectInput (node) {
      if(node.value !==''&& node.value) {
        node.className ="correct_input";
        return true;
      }
      else {
        node.className ="wrong_input";
        return false;
       }
}
function focusInHandler(e) {
  const target = e.target;  
  const warningNode = target.parentNode.nextElementSibling;
  hide(warningNode);
  target.className ="correct_input";
}
function focusOutHandler(e) {
  const target = e.target;
  const warningNode = target.parentNode.nextElementSibling;
  let correct = detectInput(target);
  if (correct) {
    hide(warningNode);
  }
  else {
    show(warningNode);
  }
}

function submitHandler(e) {
    e.preventDefault();
    if(this.userId.value !== '' && this.userId.className =="correct_input") {
      let check = /^[A-Za-z0-9]{1,}$/; 
      if (check.test(this.userId.value)) {
        if(this.userCode.value !== '' && this.userCode.className =="correct_input") {
          let check = /^[A-Za-z0-9]{1,}$/; 
          if (check.test(this.userCode.value)) { 
            axios.post('http://pan.bulibuli.wang/auth/login',
              {
              account:this.userId.value,
              password:this.userCode.value
               },
               {
              withCredentials: true
             })
          .then(function({data}){
              if(!data.success) {
                return alert("用户名或密码错误,请重新输入");
              } 
              else {
                console.log(data)
                alert(data.message);
                location.href = '/disk';
              }

          })
          .catch(function(error){
              console.log(error);
          });
          };
          return true;
        } 
      }
    };
    
    return alert("请输入正确的账号或密码");
}
const login_name = document.querySelector('.loginpage .name input');
const login_code = document.querySelector('.loginpage .code input');
const loginform = document.querySelector(".loginform");

login_name.addEventListener('focusin', focusInHandler, false);
login_name.addEventListener('focusout', focusOutHandler, false);
login_code.addEventListener('focusin', focusInHandler, false);
login_code.addEventListener('focusout', focusOutHandler, false);
loginform.addEventListener('submit', submitHandler, false);

