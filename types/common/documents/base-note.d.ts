declare module foundry {
    module documents {
        /**The Note embedded document model. */
        class BaseNote extends abstract.Document {
            /** @override */
            static get schema(): typeof data.NoteData;

            /** @override */
            static get metadata(): NoteMetadata;

            /** Is a user able to update an existing Note? */
            protected static _canUpdate(user: BaseUser, doc: BaseNote, data: data.NoteData): boolean;
        }

        interface BaseNote {
            readonly data: data.NoteData<BaseNote>;
        }

        interface NoteMetadata extends abstract.DocumentMetadata {
            name: 'Note';
            collection: 'notess';
            label: 'DOCUMENT.Note';
            isEmbedded: true;
            permissions: Omit<abstract.DocumentMetadata['permissions'], 'update'> & {
                update: typeof foundry.documents.BaseNote['_canUpdate'];
            };
        }
    }
}
