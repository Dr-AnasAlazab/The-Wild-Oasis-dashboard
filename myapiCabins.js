import supabase, { supabaseUrl } from './src/services/supabase';

export async function getacabins() {
  const { data, error } = await supabase.from('cabin').select('*');

  if (error) {
    console.log(error.message);

    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image?.name}.replaceAll(
      '/',
      ''
    )`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabin');

  // Create

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error.message);
    throw new Error('Cabins could not be created');
  }
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabin').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Cabins image could not be uploaded and the cabin was not created'
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabin').delete().eq('id', id);
  if (error) {
    console.log(error.message);
    throw new Error('Cabins could not be loaded');
  }
}
