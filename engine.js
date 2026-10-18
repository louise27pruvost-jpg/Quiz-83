/* Règles du jeu : points, acceptation des réponses, classement (testables sans navigateur) */
(function(g){
const E={};
// bonne réponse = points de base + bonus de rapidité modéré (20 % maximum)
E.points=(pts,time,msLeft,bonus)=>pts+(bonus?Math.round(pts*0.2*Math.max(0,Math.min(1,msLeft/(time*1000)))):0);
// une seule réponse par participant, uniquement pendant le compte à rebours
E.accept=(g,p,qi,k,now)=>!p?"unknown":(g.ph!=="count"||g.paused||qi!==g.qi)?"closed":now>g.endsAt?"late":p.ans?"dup":!(Number.isInteger(k)&&k>=0&&k<4)?"bad":"ok";
// égalité : le plus rapide (temps cumulé des bonnes réponses) passe devant, puis l'ordre alphabétique
E.rank=list=>[...list].sort((a,b)=>b.score-a.score||a.ms-b.ms||a.name.localeCompare(b.name,"fr")).map((p,i)=>({id:p.id,name:p.name,score:p.score,gain:p.gain||0,ans:p.ans||null,rank:i+1}));
E.cleanName=s=>String(s||"").replace(/\s+/g," ").trim().slice(0,14);
E.nameTaken=(players,id,name)=>[...players.values()].some(p=>p.id!==id&&p.name.toLowerCase()===name.toLowerCase());
if(typeof module!=="undefined"&&module.exports)module.exports=E;else g.E83=E;
})(typeof window!=="undefined"?window:globalThis);
