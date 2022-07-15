import{ethers} from "./ethers.js"
import {abi,contractaddress} from "./constants.js"

const connectbutton= document.getElementById("connectbutton")
const fundbutton = document.getElementById("fundbutton")
const balancebutton = document.getElementById("balancebutton")
const withdrawbutton = document.getElementById("withdrawbutton")

withdrawbutton.onclick = withdraw
balancebutton.onclick = balanceget
connectbutton.onclick=  connect
fundbutton.onclick = fund

async function withdraw(){

    if(window.ethereum!=="undefined"){
        
        console.log("withdrawing..")
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractaddress,abi,signer)
        try{
    
        const transactionresponse = await contract.withdraw()
        await listentxnmine(transactionresponse,provider)
        console.log("withdrawal done")
    
        }
        catch(error){
    
            console.log("error")
    
        }
    
        
    
        }

    
}
async function balanceget(){

    if(window.ethereum!=="undefined"){

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        
    try{

    const balance = await provider.getBalance(contractaddress)
    console.log(`balance is ${ethers.utils.formatEther(balance)}`)

    }
    catch(error){

        console.log("error")

    }

    

    }

    }



async function connect(){
    if(window.ethereum!== "undefined" ){

        try{
        
       await window.ethereum.request({ method: 'eth_requestAccounts' })
        }
        catch(error){
            console.log(error)
        }
       console.log("connected")
       connectbutton.innerHTML="connected"
        
        
    }
       
    else{

        connectbutton.innerHTML="install metamask"
    }
}

const ethamount=1

async function fund(){
    const ethamount= document.getElementById("ethamount").value
    if(window.ethereum!=="undefined"){
    console.log(`funding with ${ethamount}`)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractaddress,abi,signer)
    try{

    const transactionresponse = await contract.fund({value : ethers.utils.parseEther(ethamount)})
    await listentxnmine(transactionresponse,provider)
    console.log("Funding done")

    }
    catch(error){

        console.log("error")

    }

    console.log(signer)

    }
}

function listentxnmine(transactionresponse,provider){
    console.log(`mining ${transactionresponse.hash}..`)
    
    return new Promise((resolve,reject)=>{
    provider.once(transactionresponse.hash,(transactionreceipt)=>{

        console.log(`completed with ${transactionreceipt.confirmations} confirmations`)
        resolve()
    })
    })
}