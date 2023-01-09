export enum LoremSize {
  PARA = 457,
  TWO_PARA = 1036,
}

export function text(position = 0) {
  const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet imperdiet ligula vitae varius. Nulla facilisi. 
Etiam enim ex, rhoncus nec rhoncus at, sodales iaculis risus. Nam ornare, felis quis bibendum sollicitudin, lacus 
lacus ornare ex, eu dictum sapien libero eget urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
Nulla bibendum sapien dui, quis consectetur dui facilisis at. Mauris accumsan arcu et venenatis volutpat. 
Vestibulum a odio ullamcorper, tristique lacus pretium, gravida erat. Suspendisse potenti. Cras in neque vel leo 
rhoncus faucibus. Sed ullamcorper, eros et luctus egestas, neque diam pulvinar mi, at iaculis orci libero et odio.
Curabitur id velit mattis, sollicitudin lectus sit amet, pulvinar ante. Nullam hendrerit pulvinar velit, nec venenatis 
orci pulvinar sed. Sed lacinia porttitor dui, vitae luctus mauris varius quis. Nam interdum, est eget tristique 
commodo, nibh lorem pretium magna, vel ultrices libero nisl ut lacus. Duis nec neque a velit malesuada condimentum. 
Proin ac auctor metus. Quisque ex nisi, convallis quis lectus a, maximus consectetur turpis. Phasellus eu varius 
lectus. Proin elementum, mauris vitae hendrerit accumsan, neque tellus tristique velit, eu fringilla lectus ante quis 
metus. Nulla elit magna, suscipit at arcu ut, posuere ornare odio. Aliquam quis laoreet ipsum. Pellentesque dictum, 
leo vitae lobortis cursus, lacus orci rhoncus justo, at imperdiet ex ex sed lectus. Integer ut velit tortor. Donec 
lacinia tincidunt hendrerit. Ut eget vestibulum ex.
Quisque sed nunc eget neque placerat ultricies. Vestibulum ultricies mi eget urna rutrum scelerisque. Donec posuere 
nunc sit amet dolor maximus fringilla. Donec sit amet dapibus lorem. Nulla vestibulum suscipit volutpat. Donec libero 
erat, porta ac congue in, pharetra ac mauris. In nec metus iaculis, commodo augue non, finibus arcu. Nunc et nulla id 
libero finibus elementum at nec nisi. Morbi egestas erat ut tincidunt tincidunt. Pellentesque fringilla dui at 
consequat sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Nam a pharetra eros, ut rhoncus tellus. Integer ex neque, euismod quis rhoncus dapibus, feugiat nec est. Sed euismod, 
neque eu dapibus consectetur, dui quam feugiat orci, sed pellentesque quam elit sed orci. Aenean non nisi et felis 
pharetra auctor. In faucibus felis nibh, vel porta lorem tempor id. Phasellus vehicula, arcu id placerat gravida, odio 
magna malesuada massa, laoreet sodales tellus ante sed nibh. Proin consectetur consectetur suscipit. Donec a nisl sed 
est rhoncus sodales vitae sit amet orci. Quisque rutrum bibendum tortor, sit amet pretium nisi pellentesque eu. Sed 
vehicula tempus libero quis dignissim. Sed id fringilla justo.
Donec ac enim pharetra, cursus leo ut, ullamcorper mauris. Integer et quam quis ante tincidunt tempor a sed augue. 
Suspendisse potenti. Mauris euismod facilisis sem sollicitudin pretium. Nunc lacus risus, cursus nec diam nec, viverra 
convallis elit. Phasellus lobortis vulputate leo volutpat dictum. Duis aliquet magna massa, et dignissim magna maximus 
ut. Nullam pellentesque est nec felis finibus efficitur. 
`;
  return text.substring(0, position || text.length);
}
