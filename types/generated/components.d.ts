import type { Schema, Attribute } from '@strapi/strapi';

export interface HomepageBannerHomepage extends Schema.Component {
  collectionName: 'components_homepage_banner_homepages';
  info: {
    displayName: 'Banner-Homepage';
  };
  attributes: {
    slug: Attribute.String & Attribute.Required;
    banner: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface MenuItemsItems extends Schema.Component {
  collectionName: 'components_menu_items_items';
  info: {
    displayName: 'Items';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    slug: Attribute.String & Attribute.Required;
  };
}

export interface MenuItemsMenu extends Schema.Component {
  collectionName: 'components_menu_items_menus';
  info: {
    displayName: 'Menu';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    slug: Attribute.String & Attribute.Required;
    Items: Attribute.Component<'menu-items.items', true>;
  };
}

export interface NutritionalFactsFactItem extends Schema.Component {
  collectionName: 'components_nutritional_facts_fact_items';
  info: {
    displayName: 'Fact-item';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    percent: Attribute.Integer;
  };
}

export interface NutritionalFactsFact extends Schema.Component {
  collectionName: 'components_nutritional_facts_facts';
  info: {
    displayName: 'Fact';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    Fact: Attribute.Component<'nutritional-facts.fact-item', true>;
    percent: Attribute.Integer;
  };
}

export interface PagePropertiesMetaTag extends Schema.Component {
  collectionName: 'components_page_properties_meta_tags';
  info: {
    displayName: 'MetaTag';
    icon: 'code';
  };
  attributes: {
    Name: Attribute.String;
    Content: Attribute.Text;
  };
}

export interface PagePropertiesSeo extends Schema.Component {
  collectionName: 'components_page_properties_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
    description: '';
  };
  attributes: {
    MetaTitle: Attribute.String;
    MetaDescription: Attribute.String;
    MetaTag: Attribute.Component<'page-properties.meta-tag', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'homepage.banner-homepage': HomepageBannerHomepage;
      'menu-items.items': MenuItemsItems;
      'menu-items.menu': MenuItemsMenu;
      'nutritional-facts.fact-item': NutritionalFactsFactItem;
      'nutritional-facts.fact': NutritionalFactsFact;
      'page-properties.meta-tag': PagePropertiesMetaTag;
      'page-properties.seo': PagePropertiesSeo;
    }
  }
}
