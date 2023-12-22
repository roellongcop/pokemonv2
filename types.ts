export type BaseType = {
  name: string;
  url: string;
}

export type PokemonList = {
  count: number;
  next: string;
  previous: string;
  results: BaseType[];
}

export type GameIndex = {
  game_index: number;
  version: BaseType;
}

export type VersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: BaseType;
  version_group: BaseType
}

export type Move = {
  move: BaseType;
  version_group_details: VersionGroupDetail[]
}

export type Image = {
  back_default: string;
  back_female: string | null;
  back_gray: string;
  back_transparent: string;
  back_shiny: string;
  back_shiny_female: string | null;
  back_shiny_transparent: string;
  front_default: string;
  front_female: string | null;
  front_gray: string;
  front_transparent: string;
  front_shiny: string;
  front_shiny_female: string | null;
  front_shiny_transparent: string;
}

export type SpriteOther = {
  dream_world: {
    front_default: string;
    front_female: string | null;
  },
  home: {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  },
  ["official-artwork"]: {
    front_default: string;
    front_shiny: string;
  }
}

export type SpriteVersion = {
  ["generation-i"]: {
    ["red-blue"]: Image;
    ["yellow"]: Image;
  };
  ["generation-ii"]: {
    ["crystal"]: Image;
    ["gold"]: Image;
    ["silver"]: Image;
  };
  ["generation-iii"]: {
    ["emerald"]: Image;
    ["firered-leafgreen"]: Image;
    ["ruby-sapphire"]: Image;
  };
  ["generation-iv"]: {
    ["diamond-pearl"]: Image;
    ["heartgold-soulsilver"]: Image;
    ["platinum"]: Image;
  };
  ["generation-v"]: {
    ["black-white"]: Image & {animated: Image};
  };
  ["generation-vi"]: {
    ["omegaruby-alphasapphire"]: Image;
    ["x-y"]: Image;
  };
  ["generation-vii"]: {
    ["icons"]: Image;
    ["ultra-sun-ultra-moon"]: Image;
  };
  ["generation-viii"]: {
    ["icons"]: Image;
  };
}

export type Stat = {
  base_stat: number;
  effort: number;
  stat: BaseType;
}

export type Type = {
  slot: number;
  type: BaseType;
}

export type Sprite = Image & {
  other: SpriteOther;
  versions: SpriteVersion;
}

export type PokemonDetail = {
  abilities: BaseType[];
  base_experience: number;
  forms: BaseType[];
  game_indices: GameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: BaseType;
  sprites: Sprite;
  stats: Stat[];
  types: Type[];
  weight: number;
}
