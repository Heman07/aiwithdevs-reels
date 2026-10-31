import re,glob,collections,sys
n=int(sys.argv[1])
c=collections.defaultdict(list)
for p in glob.glob('src/horror/Shots*.tsx'):
  s=open(p).read(); m=re.search(r'export const SHOTS\d*[^=]*=\s*\{(.*?)\};',s,re.S)
  for k in re.findall(r'(\w+):',m.group(1)): c[k].append(p)
d={k:v for k,v in c.items() if len(v)>1}
if d: print("DUP",d)
lines=['import { SHOTS as S1 } from "./Shots";']+[f'import {{ SHOTS{i} }} from "./Shots{i}";' for i in range(2,n+1)]
lines.append('export const SHOTS = { ...S1, '+', '.join(f'...SHOTS{i}' for i in range(2,n+1))+' };')
open('src/horror/registry.ts','w').write('\n'.join(lines)+'\n')
