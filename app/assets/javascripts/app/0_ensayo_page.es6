class EnsayoPage{
  constructor(elementId){
    this.elementId = elementId

    EnsayoPage.allInstances.push(this)
  }

  _loaded(){
    this.element = document.getElementById(this.elementId)
    if(!this.element){
      return false
    }
    this.loaded()
  }

  loaded(){
    // noop - implement in subclass
    throw('NotImplementedError')
  }
}

EnsayoPage.allInstances = []

window.EnsayoPage = EnsayoPage

// TODO: For now there is really just one instance created everytime
$(function(){
  for(const ensayoPageInstance of EnsayoPage.allInstances){
    ensayoPageInstance._loaded();
  }
  console.log('All pages loaded!')
})
