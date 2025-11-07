/*
 * Yutovo Web
 * Copyright (C) 2022-2025 Yutovo developers. All rights reserved.
 * This file is a part of the Yutovo project
 * SPDX-License-Identifier: GPL-3.0-only
 */

#include "command_map.h"
#include <emscripten/key_codes.h>

extern void Copy();
extern void Paste();
extern void Cut();

namespace yutovo_web
{

void ShortcutsMap::Init(Document* _document)
{
    document = _document;
    if (!document)
        return;

    command_maps.clear();

    //caret moving
    Add(KeySequence(DOM_VK_LEFT), "", std::function<void ()>(std::bind(&Document::MoveCaretLeft, document, false, false)));
    Add(KeySequence(DOM_VK_RIGHT), "", std::function<void ()>(std::bind(&Document::MoveCaretRight, document, false, false)));
    Add(KeySequence(DOM_VK_UP), "", std::function<void ()>(std::bind(&Document::MoveCaretUp, document, false)));
    Add(KeySequence(DOM_VK_DOWN), "", std::function<void ()>(std::bind(&Document::MoveCaretDown, document, false)));

    Add(KeySequence(DOM_VK_LEFT, true, false, false), "", std::function<void ()>(std::bind(&Document::MoveCaretWordLeft, document, false)));
    Add(KeySequence(DOM_VK_RIGHT, true, false, false), "", std::function<void ()>(std::bind(&Document::MoveCaretWordRight, document, false)));

    Add(KeySequence(DOM_VK_HOME), "", std::function<void ()>(std::bind(&Document::MoveCaretHome, document, false)));
    Add(KeySequence(DOM_VK_END), "", std::function<void ()>(std::bind(&Document::MoveCaretEnd, document, false)));

    Add(KeySequence(DOM_VK_PAGE_UP), "", std::function<void ()>(std::bind(&Document::MoveCaretPageUp, document, false)));
    Add(KeySequence(DOM_VK_PAGE_DOWN), "", std::function<void ()>(std::bind(&Document::MoveCaretPageDown, document, false)));

    Add(KeySequence(DOM_VK_HOME, true, false, false), "", std::function<void ()>(std::bind(&Document::MoveCaretToDocumentBegin, document, false)));
    Add(KeySequence(DOM_VK_END, true, false, false), "", 
        std::function<void ()>(std::bind(static_cast<uint(Document::*)(bool)>(&Document::MoveCaretToDocumentEnd), document, false)));

    //selection
    Add(KeySequence(DOM_VK_LEFT, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretLeft, document, true, true)));
    Add(KeySequence(DOM_VK_RIGHT, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretRight, document, true, true)));
    Add(KeySequence(DOM_VK_HOME, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretHome, document, true)));
    Add(KeySequence(DOM_VK_END, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretEnd, document, true)));
    Add(KeySequence(DOM_VK_UP, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretUp, document, true)));
    Add(KeySequence(DOM_VK_DOWN, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretDown, document, true)));

    Add(KeySequence(DOM_VK_LEFT, true, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretWordLeft, document, true)));
    Add(KeySequence(DOM_VK_RIGHT, true, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretWordRight, document, true)));

    Add(KeySequence(DOM_VK_PAGE_UP, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretPageUp, document, true)));
    Add(KeySequence(DOM_VK_PAGE_DOWN, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretPageDown, document, true)));

    Add(KeySequence(DOM_VK_A, true, false, false), "", std::function<void ()>(std::bind(&Document::SelectAll, document)));

    //edit text
    Add(KeySequence(DOM_VK_DELETE), "", std::function<void ()>(std::bind(&Document::DeleteElements, document, false, true)));
    Add(KeySequence(DOM_VK_BACK_SPACE), "", std::function<void ()>(std::bind(&Document::DeleteElements, document, true, true)));
    Add(KeySequence(DOM_VK_RETURN), "", std::function<void ()>(std::bind(&Document::InsertParagraph, document, true)));

    Add(KeySequence(DOM_VK_TAB), "", std::function<void ()>(std::bind(static_cast<uint(Document::*)(const std::u32string&, bool)>(&Document::InsertString), 
        document, U"	", true)));

    Add(KeySequence(DOM_VK_Z, true, false, false), "", std::function<void ()>(std::bind(&Document::Undo, document)));
    Add(KeySequence(DOM_VK_Y, true, false, false), "", std::function<void ()>(std::bind(&Document::Redo, document)));

    Add(KeySequence(DOM_VK_INSERT, true, false, false), "", std::function<void ()>(std::bind(&Copy)));
    Add(KeySequence(DOM_VK_INSERT, false, true, false), "", std::function<void ()>(std::bind(&Paste)));
    Add(KeySequence(DOM_VK_DELETE, false, true, false), "", std::function<void ()>(std::bind(&Cut)));

    //edit code
    Add(KeySequence(DOM_VK_C, true, true, false), "\\code", std::function<void ()>(std::bind(&Document::InsertCode, document, false, true)));
    Add(KeySequence(DOM_VK_D, true, true, false), "\\div", std::function<void ()>(std::bind(&Document::InsertDivision, document, true)));
    Add(KeySequence(), '+', "\\plus", std::function<void ()>(std::bind(&Document::InsertPlus, document, true)), CommandContext::Formula);
    Add(KeySequence(), '-', "\\minus", std::function<void ()>(std::bind(&Document::InsertMinus, document, true)), CommandContext::Formula);
    Add(KeySequence(), '*', "\\times", std::function<void ()>(std::bind(&Document::InsertMultiply, document, true)), CommandContext::Formula);
    Add(KeySequence(), '/', "\\div", std::function<void ()>(std::bind(&Document::InsertDivision, document, true)), CommandContext::Formula);
    Add(KeySequence(DOM_VK_P, true, true, false), "\\pow", std::function<void ()>(std::bind(&Document::InsertPower, document, true)), 
        CommandContext::Formula);
    Add(KeySequence(DOM_VK_S, true, true, false), "\\sub", std::function<void ()>(std::bind(&Document::InsertSubscript, document, true)), 
        CommandContext::Formula);
    Add(KeySequence(DOM_VK_N, true, true, false), "\\nth", std::function<void ()>(std::bind(&Document::InsertNthRoot, document, true)));
    Add(KeySequence(DOM_VK_Q, true, true, false), "\\sqrt", std::function<void ()>(std::bind(&Document::InsertSquareRoot, document, true)));
    Add(KeySequence(), '=', "\\equal", std::function<void ()>(std::bind(&Document::InsertEquation, document, ResultType::AUTO, true)), 
        CommandContext::Formula);
    Add(KeySequence(), "\\eq_real", std::function<void ()>(std::bind(&Document::InsertEquation, document, ResultType::REAL, true)), 
        CommandContext::Formula);
    Add(KeySequence(), "\\eq_int", std::function<void ()>(std::bind(&Document::InsertEquation, document, ResultType::INTEGER, true)), 
        CommandContext::Formula);
    Add(KeySequence(), "\\eq_rat", std::function<void ()>(std::bind(&Document::InsertEquation, document, ResultType::RATIONAL, true)), 
        CommandContext::Formula);
    Add(KeySequence(), "\\eq_comp", std::function<void ()>(std::bind(&Document::InsertEquation, document, ResultType::COMPLEX, true)), 
        CommandContext::Formula);
    Add(KeySequence(), '(', "", std::function<void ()>(std::bind(&Document::InsertOpenRoundBracket, document, true)), 
        CommandContext::Formula);
    Add(KeySequence(), ')', "", std::function<void ()>(std::bind(&Document::InsertCloseRoundBracket, document, true)), 
        CommandContext::Formula);
    Add(KeySequence(), '[', "", std::function<void ()>(std::bind(&Document::InsertOpenSquareBracket, document, true)), 
        CommandContext::Formula);
    Add(KeySequence(), ']', "", std::function<void ()>(std::bind(&Document::InsertCloseSquareBracket, document, true)), 
        CommandContext::Formula);
    Add(KeySequence(), ':', "\\assign", std::function<void ()>(std::bind(&Document::InsertAssignment, document, true)), CommandContext::Formula);
    Add(KeySequence(), '~', "\\unit", std::function<void ()>(std::bind(static_cast<uint(Document::*)(bool)>(&Document::InsertUnit), 
        document, true)), CommandContext::Formula);
}

bool ShortcutsMap::Call(const KeySequence& shortcut, char32_t symbol, const EditorState& editor_state)
{
    struct CommandMapsVisitor
    {
        CommandMapsVisitor(const KeySequence& _shortcut, char32_t _symbol, Document* _document, const EditorState& _editor_state, bool& _res) :
            shortcut(_shortcut),
            symbol(_symbol),
            document(_document),
            editor_state(_editor_state),
            res(_res)
        {
        }

        void operator()(CommandMapVoid& m)
        {
            if (m.shortcut == shortcut || (m.symbol != 0 && m.symbol == symbol))
            {
                switch (m.context)
                {
                case CommandContext::Formula:
                    if (document->GetParentId(editor_state.caret_state.id, ElementType::CODE_BLOCK) == ElementId{})
                        return;
                    break;
                case CommandContext::Text:
                    if (document->GetParentId(editor_state.caret_state.id, ElementType::CODE_BLOCK) != ElementId{})
                        return;
                    break;
                case CommandContext::Everywhere:
                    break;
                }
                m();
                res = true;
            }
        }

        void operator()(CommandMapString& m)
        {
        }

        const KeySequence& shortcut;
        char32_t symbol;
        Document* document;
        const EditorState& editor_state;
        bool& res;
    };

    for (auto& c : command_maps)
    {
        bool res = false;
        std::visit(CommandMapsVisitor{shortcut, symbol, document, editor_state, res}, c);
        if (res)
            return true;
    }

    return false;
}

void ShortcutsMap::Add(KeySequence shortcut, std::string command, std::function<void (void)> func, CommandContext context)
{
    command_maps.push_back(CommandMapVoid{shortcut, 0, command, context, func});
}

void ShortcutsMap::Add(KeySequence shortcut, char32_t symbol, std::string command, std::function<void (void)> func, CommandContext context)
{
    command_maps.push_back(CommandMapVoid{shortcut, symbol, command, context, func});
}

void ShortcutsMap::Add(KeySequence shortcut, std::string command, std::function<void (const std::string&)> func, CommandContext context)
{
    command_maps.push_back(CommandMapString{shortcut, 0, command, context, func});
}

void ShortcutsMap::Add(KeySequence shortcut, char32_t symbol, std::string command, std::function<void (const std::string&)> func, CommandContext context)
{
    command_maps.push_back(CommandMapString{shortcut, symbol, command, context, func});
}

}
