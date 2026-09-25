import React,{useState} from "react";
import {Routes,Route,Link,useParams} from "react-router-dom";

const items=[
 {id:1,title:"Featured Collection",category:"Featured",image:"https://picsum.photos/seed/hub1/800/500",description:"A sample collection page using original placeholder content."},
 {id:2,title:"Creator Spotlight",category:"Creators",image:"https://picsum.photos/seed/hub2/800/500",description:"Discover a featured creator and their latest work."},
 {id:3,title:"New This Week",category:"New",image:"https://picsum.photos/seed/hub3/800/500",description:"Fresh content added to the community this week."},
 {id:4,title:"Popular Picks",category:"Popular",image:"https://picsum.photos/seed/hub4/800/500",description:"A selection of popular posts from the site."},
 {id:5,title:"Community Stories",category:"Stories",image:"https://picsum.photos/seed/hub5/800/500",description:"Original stories submitted by community members."},
 {id:6,title:"Editor's Choice",category:"Featured",image:"https://picsum.photos/seed/hub6/800/500",description:"An editor-selected feature with a clean detail layout."}
];

function Header({onSearch}){const [q,setQ]=useState("");return <header><div className="nav"><Link className="brand" to="/">CONTENT<span>HUB</span></Link><nav><Link to="/">Home</Link><Link to="/browse">Browse</Link><Link to="/categories">Categories</Link></nav><div className="actions"><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onSearch(q)} placeholder="Search..."/><Link className="login" to="/login">Sign in</Link></div></div></header>}

function Card({item}){return <Link className="card" to={"/content/"+item.id}><img src={item.image}/><div className="cardBody"><small>{item.category}</small><h3>{item.title}</h3><p>{item.description}</p></div></Link>}

function Home(){return <><section className="hero"><div><p className="eyebrow">WELCOME TO CONTENT HUB</p><h1>Discover something<br/><span>worth watching.</span></h1><p className="lead">A modern content discovery platform built with React. Browse collections, creators and community stories.</p><Link className="primary" to="/browse">Explore content</Link></div></section><section className="section"><div className="sectionHead"><h2>Featured</h2><Link to="/browse">View all →</Link></div><div className="grid">{items.slice(0,4).map(i=><Card key={i.id} item={i}/>)}</div></section></>}

function Browse(){const [q,setQ]=useState("");const filtered=items.filter(i=>(i.title+" "+i.category+" "+i.description).toLowerCase().includes(q.toLowerCase()));return <section className="section page"><h1>Browse</h1><div className="largeSearch"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search content..."/></div><div className="grid">{filtered.map(i=><Card key={i.id} item={i}/>)}</div></section>}

function Categories(){let cats=[...new Set(items.map(i=>i.category))];return <section className="section page"><h1>Categories</h1><div className="categoryGrid">{cats.map(c=><Link className="category" key={c} to={"/browse?category="+encodeURIComponent(c)}><span>#{c}</span><b>Explore →</b></Link>)}</div></section>}

function Content(){const {id}=useParams();const item=items.find(x=>x.id===Number(id));if(!item)return <section className="page section"><h1>Not found</h1><Link to="/browse">Back to browse</Link></section>;return <section className="detail page"><img src={item.image}/><div><small>{item.category}</small><h1>{item.title}</h1><p>{item.description}</p><p className="muted">This is an original demo detail page. Replace the placeholder media and copy with content you own or have permission to use.</p><button className="primary">♡ Save</button></div></section>}

function Login(){return <section className="auth page"><div className="authBox"><h1>Welcome back</h1><p>Sign in to continue.</p><input placeholder="Email"/><input placeholder="Password" type="password"/><button className="primary">Sign in</button><small>Demo UI — connect your preferred authentication provider.</small></div></section>}

function App(){const [term,setTerm]=useState("");const search=q=>{setTerm(q); if(q) window.location.href="/browse";};return <><Header onSearch={search}/><main><Routes><Route path="/" element={<Home/>}/><Route path="/browse" element={<Browse/>}/><Route path="/categories" element={<Categories/>}/><Route path="/content/:id" element={<Content/>}/><Route path="/login" element={<Login/>}/></Routes></main><footer><b>CONTENT HUB</b><span>Original demo template • Built with React</span></footer></>}

export default App;