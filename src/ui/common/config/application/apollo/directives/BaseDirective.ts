import { SchemaDirectiveVisitor } from 'apollo-server-express';
import {
  GraphQLField,
  GraphQLObjectType,
  defaultFieldResolver,
  GraphQLFieldResolver,
  GraphQLResolveInfo,
} from 'graphql';

export abstract class BaseDirective extends SchemaDirectiveVisitor {
  visitObject(objectType: GraphQLObjectType<any, any>) {
    this.wrapFields(objectType);
  }

  visitFieldDefinition(field: GraphQLField<any, any>) {
    this.wrapField(field);
  }

  protected wrapField(field: GraphQLField<any, any>): void {
    const { resolve = defaultFieldResolver } = field;

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (...args) => {
      return this.resolveField(resolve, args, this.args);
    };
  }

  protected wrapFields(objectType: GraphQLObjectType<any, any>) {
    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver, astNode } = field;
      const { astNode: astNodeObject } = objectType;

      const fieldHasDirective =
        astNode && astNode.directives && astNode.directives.length;

      const objectHasDirective =
        astNodeObject &&
        astNodeObject.directives &&
        astNodeObject.directives.length;

      if (fieldHasDirective && objectHasDirective) {
        const hasSameDirectiveApplied = astNode!.directives!.some(directive =>
          astNodeObject!.directives!.some(
            objectDirective =>
              directive.name.value === objectDirective.name.value
          )
        );

        if (hasSameDirectiveApplied) {
          return;
        }
      }

      field.resolve = async (...args) => {
        return this.resolveField(resolve, args, this.args);
      };
    });
  }

  protected abstract resolveField(
    resolve: GraphQLFieldResolver<any, any>,
    args: [any, { [argName: string]: any }, any, GraphQLResolveInfo],
    directiveArgs: {
      [name: string]: any;
    }
  ): Promise<any>;
}
