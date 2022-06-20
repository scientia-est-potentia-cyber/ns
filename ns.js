function listen(fn){
    fn=fn||console.log
    let property=Object.getOwnPropertyDescriptor
    (MessageEvent.prototype,"data")
    const data=property.get
    function lookAtMessage(){ //to replace get function
      let socket=this.currentTarget instanceof WebSocket
      if(!socket){return data.call(this)}
      let msg=data.call(this)
      Object.defineProperty(this,"data",{value:msg}) //anti-loop
      fn({data:msg,socket:this.currentTarget,event:this})
      return msg
    }
    property.get=lookAtMessage
    Object.defineProperty
    (MessageEvent.prototype,"data",property)
  }
  listen( ({data})=>console.log(data) );
