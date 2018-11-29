new Vue({
    el:"#root",
    data:{
        all:[],
        text:"",
        status:"all"
    },
    methods: {
        add() {
            var obj={};
            obj.text=this.text;
            if(!obj.text){
                alert("请输入内容");
                return;
            }
            obj.id=Math.random()+new Date().getTime;
            obj.state=0;
            obj.edit=true;
           this.all.push(obj) ;
           this.text="";
        },
        changeStatus(val){
            this.status=val;
            console.log(val)
        },
        chengeState(obj){
            if(obj.state==0){
                obj.state=1;
            }else{
                obj.state=0;
            }
        },
        del(id){
           this.all= this.all.filter(function(obj){
                if(obj.id!=id){
                    return obj;
                }
            })
        },
        edit(item){
            item.edit=!item.edit
        }

    },
    computed:{
        datas:function(){
           return  this.all.filter((obj)=>{
               console.log(obj)
                if(this.status=="all"){
                    return obj;
                }else{
                    if(this.status==obj.state){
                        return obj;
                    }
                }
            })
        }
    }
})