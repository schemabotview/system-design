import re,glob,json,sys
# id -> list of (slot, bullet); slot M = first h3 list, W = second h3 list
A={'foundations/design-method': [('M', 'Three movements: **understand** (1–2) · **shape** (3–5) · **defend** (6–9)'), ('W', 'Walked through: p99 < 50 ms · 40 writes/s · POST /urls + GET /{code} · key-value · cache · multi-AZ')], 'foundations/requirements-engineering': [('W', 'Implicit needs surface late: deleted stays deleted, private stays private')], 'foundations/scaling-fundamentals': [('W', '**Amdahl**: 100 machines at 5% serial give only **~17×**')], 'storage/relational-databases': [('M', '**Isolation** runs from read committed to serializable — stronger costs concurrency'), ('W', 'Lost update: fix with an atomic UPDATE, SELECT FOR UPDATE, or serializable + retry')], 'expert/bottleneck-analysis': [('W', 'Low CPU + low throughput = something is waiting')], 'expert/design-evolution': [('M', '1K one box · 100K DB + replica · 10M cache, replicas, queue · 1B shards, regions, cells')], 'expert/architecture-defense': [('M', 'Principle: every part has a reason, every failure a plan, every promise a boundary')]}
def patch(path,items):
    s=open(path).read()
    m=re.search(r"slide: `(.*?)`,\n",s,re.S); body=m.group(1)
    parts=re.split(r'(?m)^(?=### )',body)  # head, h3 blocks
    head,blocks=parts[0],parts[1:]
    for slot,b in items:
        i=0 if slot=='M' else 1
        if i>=len(blocks): i=len(blocks)-1
        blk=blocks[i].rstrip('\n')+'\n- '+b.replace('`','\\`')+'\n'
        blocks[i]=blk+('\n' if i<len(blocks)-1 else '')
    # ensure blank line between blocks
    out=head+''.join(x if x.endswith('\n\n') or j==len(blocks)-1 else x.rstrip('\n')+'\n\n' for j,x in enumerate(blocks))
    s=s[:m.start(1)]+out.rstrip('\n')+s[m.end(1):]
    open(path,'w').write(s)
files={}
for f in glob.glob('src/content/*/[0-9]*.ts'):
    cid=f.split('/')[2]; sid=re.search(r"id: '([^']+)'",open(f).read()).group(1); files[f'{cid}/{sid}']=f
bad=[k for k in A if k not in files]; print('unknown',bad)
for k,items in A.items(): patch(files[k],items)
print('patched',len(A))
