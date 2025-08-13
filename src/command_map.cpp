#include "command_map.h"
#include <emscripten/key_codes.h>

extern void Copy();
extern void Paste();
extern void Cut();

namespace yutovo_web
{

void ShortcutsMap::Init(DocumentPtr _document)
{
    document = _document;

    //caret moving
    Add(KeySequence(DOM_VK_LEFT), "", std::function<void ()>(std::bind(&Document::MoveCaretLeft, document.get(), false, false)));
    Add(KeySequence(DOM_VK_RIGHT), "", std::function<void ()>(std::bind(&Document::MoveCaretRight, document.get(), false, false)));
    Add(KeySequence(DOM_VK_UP), "", std::function<void ()>(std::bind(&Document::MoveCaretUp, document.get(), false)));
    Add(KeySequence(DOM_VK_DOWN), "", std::function<void ()>(std::bind(&Document::MoveCaretDown, document.get(), false)));

    Add(KeySequence(DOM_VK_LEFT, true, false, false), "", std::function<void ()>(std::bind(&Document::MoveCaretWordLeft, document.get(), false)));
    Add(KeySequence(DOM_VK_RIGHT, true, false, false), "", std::function<void ()>(std::bind(&Document::MoveCaretWordRight, document.get(), false)));

    Add(KeySequence(DOM_VK_HOME), "", std::function<void ()>(std::bind(&Document::MoveCaretHome, document.get(), false)));
    Add(KeySequence(DOM_VK_END), "", std::function<void ()>(std::bind(&Document::MoveCaretEnd, document.get(), false)));

    Add(KeySequence(DOM_VK_PAGE_UP), "", std::function<void ()>(std::bind(&Document::MoveCaretPageUp, document.get(), false)));
    Add(KeySequence(DOM_VK_PAGE_DOWN), "", std::function<void ()>(std::bind(&Document::MoveCaretPageDown, document.get(), false)));

    Add(KeySequence(DOM_VK_HOME, true, false, false), "", std::function<void ()>(std::bind(&Document::MoveCaretToDocumentBegin, document.get(), false)));
    Add(KeySequence(DOM_VK_END, true, false, false), "", 
        std::function<void ()>(std::bind(static_cast<uint(Document::*)(bool)>(&Document::MoveCaretToDocumentEnd), document.get(), false)));

    //selection
    Add(KeySequence(DOM_VK_LEFT, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretLeft, document.get(), true, true)));
    Add(KeySequence(DOM_VK_RIGHT, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretRight, document.get(), true, true)));
    Add(KeySequence(DOM_VK_HOME, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretHome, document.get(), true)));
    Add(KeySequence(DOM_VK_END, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretEnd, document.get(), true)));
    Add(KeySequence(DOM_VK_UP, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretUp, document.get(), true)));
    Add(KeySequence(DOM_VK_DOWN, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretDown, document.get(), true)));

    Add(KeySequence(DOM_VK_LEFT, true, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretWordLeft, document.get(), true)));
    Add(KeySequence(DOM_VK_RIGHT, true, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretWordRight, document.get(), true)));

    Add(KeySequence(DOM_VK_PAGE_UP, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretPageUp, document.get(), true)));
    Add(KeySequence(DOM_VK_PAGE_DOWN, false, true, false), "", std::function<void ()>(std::bind(&Document::MoveCaretPageDown, document.get(), true)));

    Add(KeySequence(DOM_VK_A, true, false, false), "", std::function<void ()>(std::bind(&Document::SelectAll, document.get())));

    //edit text
    Add(KeySequence(DOM_VK_DELETE), "", std::function<void ()>(std::bind(&Document::DeleteElements, document.get(), false, true)));
    Add(KeySequence(DOM_VK_BACK_SPACE), "", std::function<void ()>(std::bind(&Document::DeleteElements, document.get(), true, true)));
    Add(KeySequence(DOM_VK_RETURN), "", std::function<void ()>(std::bind(&Document::InsertParagraph, document.get(), true)));

    Add(KeySequence(DOM_VK_TAB), "", std::function<void ()>(std::bind(static_cast<uint(Document::*)(const std::u32string&, bool)>(&Document::InsertString), 
        document.get(), U"	", true)));

    Add(KeySequence(DOM_VK_Z, true, false, false), "", std::function<void ()>(std::bind(&Document::Undo, document.get())));
    Add(KeySequence(DOM_VK_Y, true, false, false), "", std::function<void ()>(std::bind(&Document::Redo, document.get())));

    Add(KeySequence(DOM_VK_INSERT, true, false, false), "", std::function<void ()>(std::bind(&Copy)));
    Add(KeySequence(DOM_VK_INSERT, false, true, false), "", std::function<void ()>(std::bind(&Paste)));
    Add(KeySequence(DOM_VK_DELETE, false, true, false), "", std::function<void ()>(std::bind(&Cut)));

    //edit code
    Add(KeySequence(DOM_VK_C, true, true, false), "\\code", std::function<void ()>(std::bind(&Document::InsertCode, document.get(), false, true)));
    Add(KeySequence(DOM_VK_D, true, true, false), "\\div", std::function<void ()>(std::bind(&Document::InsertDivision, document.get(), true)));
    Add(KeySequence(), '+', "\\plus", std::function<void ()>(std::bind(&Document::InsertPlus, document.get(), true)), CommandContext::Formula);
    Add(KeySequence(), '-', "\\minus", std::function<void ()>(std::bind(&Document::InsertMinus, document.get(), true)), CommandContext::Formula);
    Add(KeySequence(), '*', "\\times", std::function<void ()>(std::bind(&Document::InsertMultiply, document.get(), true)), CommandContext::Formula);
    Add(KeySequence(), '/', "\\div", std::function<void ()>(std::bind(&Document::InsertDivision, document.get(), true)), CommandContext::Formula);
    Add(KeySequence(DOM_VK_6, true, true, false), "\\pow", std::function<void ()>(std::bind(&Document::InsertPower, document.get(), true)), 
        CommandContext::Formula);
    Add(KeySequence(DOM_VK_3, true, true, false), "\\sub", std::function<void ()>(std::bind(&Document::InsertSubscript, document.get(), true)), 
        CommandContext::Formula);
    Add(KeySequence(DOM_VK_N, true, true, false), "\\nth", std::function<void ()>(std::bind(&Document::InsertNthRoot, document.get(), true)));
    Add(KeySequence(DOM_VK_S, true, true, false), "\\sqrt", std::function<void ()>(std::bind(&Document::InsertSquareRoot, document.get(), true)));
    Add(KeySequence(), '=', "\\equal", std::function<void ()>(std::bind(&Document::InsertEquation, document.get(), ResultType::AUTO, true)), 
        CommandContext::Formula);
    Add(KeySequence(), "\\eq_real", std::function<void ()>(std::bind(&Document::InsertEquation, document.get(), ResultType::REAL, true)), 
        CommandContext::Formula);
    Add(KeySequence(), "\\eq_int", std::function<void ()>(std::bind(&Document::InsertEquation, document.get(), ResultType::INTEGER, true)), 
        CommandContext::Formula);
    Add(KeySequence(), "\\eq_rat", std::function<void ()>(std::bind(&Document::InsertEquation, document.get(), ResultType::RATIONAL, true)), 
        CommandContext::Formula);
    Add(KeySequence(), "\\eq_comp", std::function<void ()>(std::bind(&Document::InsertEquation, document.get(), ResultType::COMPLEX, true)), 
        CommandContext::Formula);
    Add(KeySequence(), '(', "", std::function<void ()>(std::bind(&Document::InsertOpenRoundBracket, document.get(), true)), 
        CommandContext::Formula);
    Add(KeySequence(), ')', "", std::function<void ()>(std::bind(&Document::InsertCloseRoundBracket, document.get(), true)), 
        CommandContext::Formula);
    Add(KeySequence(), '[', "", std::function<void ()>(std::bind(&Document::InsertOpenSquareBracket, document.get(), true)), 
        CommandContext::Formula);
    Add(KeySequence(), ']', "", std::function<void ()>(std::bind(&Document::InsertCloseSquareBracket, document.get(), true)), 
        CommandContext::Formula);
    Add(KeySequence(), ':', "\\assign", std::function<void ()>(std::bind(&Document::InsertAssignment, document.get(), true)), CommandContext::Formula);
    Add(KeySequence(), '~', "\\unit", std::function<void ()>(std::bind(static_cast<uint(Document::*)(bool)>(&Document::InsertUnit), 
        document.get(), true)), CommandContext::Formula);
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
        std::visit(CommandMapsVisitor{shortcut, symbol, document.get(), editor_state, res}, c);
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
