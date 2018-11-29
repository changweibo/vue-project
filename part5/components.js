Vue.component("to_do",{
    props:{
        "text":[Number,String]
    },
    template:`
    <div class="box">
            <div class="input">
                <input type="text" placeholder="请输入内容" v-model="text" @keyup.13="add()">
            </div>
            <div class="btns">
                <input type="button" value="全部" @click="changeStatus('all')" :class="{check:status=='all'}">
                <input type="button" value="未完成" @click="changeStatus('0')" :class="{check:status=='0'}">
                <input type="button" value="已完成" @click="changeStatus('1')" :class="{check:status=='1'}">
            </div>
            <ul class="list">
                <li v-for="item in datas" :key="item">
                    <div v-if="item.edit==true">
                        <span class="opt" @click=chengeState(item) :class="{red:item.state==1}"></span>
                        <p @dblclick="edit(item)">{{item.text}}</p>
                        <span class="del" @click="del(item.id)">删除</span>
                    </div>
                    <div v-else>
                        <input type="text" v-model="item.text" @blur=edit(item)>
                    </div>
                </li>
            </ul>
            <div v-show="datas.length==0">没有数据</div>
        </div>
    `, data:function(){
        return {
            all:localStorage.todo?JSON.parse(localStorage.todo):[],
            text:"",
            status:"all"
        }
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
           localStorage.todo=JSON.stringify(this.all)
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
            localStorage.todo=JSON.stringify(this.all)
        },
        del(id){
           this.all= this.all.filter(function(obj){
                if(obj.id!=id){
                    return obj;
                }
            })
            localStorage.todo=JSON.stringify(this.all)
        },
        edit(item){
            item.edit=!item.edit
            localStorage.todo=JSON.stringify(this.all)
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