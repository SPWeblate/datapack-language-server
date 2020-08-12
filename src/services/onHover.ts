import { Hover } from 'vscode-languageserver'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { ArgumentNode, GetHoverInformation, NodeRange } from '../nodes/ArgumentNode'
import { SyntaxComponent } from '../types'
import { CacheFile } from '../types/ClientCache'

export function onHover({ textDoc, node, offset }: { textDoc: TextDocument, offset: number, node: SyntaxComponent, cacheFile: CacheFile }): Hover | null {
    if (node.data instanceof Array) {
        for (const { data } of node.data) {
            if (data instanceof ArgumentNode) {
                const range = data[NodeRange]
                if (range.start <= offset && offset <= range.end) {
                    return data[GetHoverInformation](textDoc, offset)
                }
            }
        }
    }

    return null
}
